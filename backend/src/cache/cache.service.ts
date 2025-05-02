import { Injectable } from "@nestjs/common";
import { RedisConfigService } from "src/config/redis";

@Injectable()
export class RedisCacheService {
  private client: RedisConfigService;
  private readonly cacheTTL = 60 * 60 * 24 * 30;
  constructor(client: RedisConfigService) {
    this.client = client;
  }
  async set(key: string, value: any) {
    await this.client.getClient().set(key, JSON.stringify(value), {
      EX: this.cacheTTL,
      NX: true,
    });
  }

  async get(key: string) {
    console.log(`Getting value for key: ${key}`);
    const value = await this.client.getClient().get(key);
    if (value) {
      return JSON.parse(value);
    }
    return null;
  }

  async getSingleValue(key: string, id: string) {
    console.log(`Getting single value for key: ${key} and id: ${id}`);
    const values = await this.get(key);
    if (values) {
      const singleValue = values.find((item: any) => item.id === id);
      return singleValue;
    }
    return null;
  }

  async getSinglePostBySlug(key: string, slug: string) {
    console.log(`Getting single value for key: ${key} and slug: ${slug}`);
    const values = await this.get(key);
    if (values) {
      const singleValue = values.find((item: any) => item.slug === slug);
      return singleValue;
    }
    return null;
  }
  // add new value to existing values
  async addNewValue(key: string, value: any) {
    console.log(`Adding new value to key: ${key} and id: ${value.id}`);
    const existingValue = await this.get(key);
    if (existingValue) {
      const newValue = [...existingValue, value];
      await this.set(key, newValue); 
    } else {
      await this.set(key, [value]);
    }
  }

  async updateValue(key: string, value: any) {
    console.log(`Updating value for key: ${key} and id: ${value.id}`);
  const existingValue = await this.get(key);
  if (existingValue) {
    const newValue = existingValue.map((item: any) =>
      item.id === value.id ? value : item,
    );
    await this.set(key, newValue);  
  } else {
    await this.set(key, [value]);  
  }
}
  async deleteValue(key: string, value: any) {
    console.log(`Deleting value from key: ${key} - and id: ${value.id}`);
    const existingValue = await this.get(key);
    if (existingValue) {
      const newValue = existingValue.filter((item: any) => item.id !== value.id);
      await this.set(key, newValue);  
    } else {
      await this.set(key, [value]);
    }
  }

  async deleteKey(key: string) {
    await this.client.getClient().del(key);
  }
}
