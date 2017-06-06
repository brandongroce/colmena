import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { RouterModule } from '@angular/router'
import { Store } from '@ngrx/store'
import { ColmenaUiModule } from '@colmena/admin-ui'

import { SystemRoutes } from './system.routes'
import { DomainExistsGuard } from './state/guards'

import { SystemDashboardComponent } from './system.component'
import { DomainsComponent } from './domains/domains.component'
import { DomainListComponent } from './domains/domain-list.component'
import { DomainDetailComponent } from './domains/domain-detail.component'
import { SettingsComponent } from './settings/settings.component'
import { UsersComponent } from './users/users.component'
import { UserDetailComponent } from './users/user-detail.component'
import { DomainsService } from './domains/domains.service'
import { SettingsService } from './settings/settings.service'
import { UsersService } from './users/users.service'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ColmenaUiModule,
    RouterModule,
  ],
  declarations: [
    DomainsComponent,
    DomainListComponent,
    DomainDetailComponent,
    SettingsComponent,
    UsersComponent,
    UserDetailComponent,
    SystemDashboardComponent,
  ],
  providers: [
    DomainsService,
    SettingsService,
    UsersService,
    DomainExistsGuard,
  ],
  exports: [
    SystemDashboardComponent,
  ],
})
export class SystemModule {

  constructor(
    private store: Store<any>,
  ) {
    this.store.dispatch({ type: 'LAYOUT_SIDEBAR_NAV', payload: { weight: 100, type: 'title', label: 'System' } })

    this.dispatchLinks({ weight: 110, label: 'Domains', icon: 'icon-globe', link: ['/', 'system', 'domains'] })
    this.dispatchLinks({ weight: 120, label: 'Settings', icon: 'icon-settings', link: ['/', 'system', 'settings'] })
    this.dispatchLinks({ weight: 130, label: 'Users', icon: 'icon-people', link: ['/', 'system', 'users'] })

    this.dispatchIcons({ count: '∞', label: 'Domains', type: 'info', icon: 'icon-globe', link: ['/', 'system', 'domains'] })
    this.dispatchIcons({ count: '∞', label: 'Settings', type: 'success', icon: 'icon-settings', link: ['/', 'system', 'settings'] })
    this.dispatchIcons({ count: '∞', label: 'Users', type: 'warning', icon: 'icon-people', link: ['/', 'system', 'users'] })
  }

  dispatchLinks(links) {
    this.store.dispatch({ type: 'LAYOUT_HEADER_NAV', payload: links })
    this.store.dispatch({ type: 'LAYOUT_SIDEBAR_NAV', payload: links })
  }

  dispatchIcons(links) {
    this.store.dispatch({ type: 'APP_SYSTEM_DASHBOARD', payload: links })
  }
}
