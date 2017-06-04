/* tslint:disable */
import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { Email } from '../../models/Email';
import { Domain } from '../../models/Domain';
import { Event } from '../../models/Event';
import { Post } from '../../models/Post';
import { Product } from '../../models/Product';
import { Setting } from '../../models/Setting';
import { Page } from '../../models/Page';
import { Container } from '../../models/Container';
import { StorageFile } from '../../models/StorageFile';
import { Ping } from '../../models/Ping';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    User: User,
    Email: Email,
    Domain: Domain,
    Event: Event,
    Post: Post,
    Product: Product,
    Setting: Setting,
    Page: Page,
    Container: Container,
    StorageFile: StorageFile,
    Ping: Ping,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
