/**
 * OData query builder utilities
 */

import type { ODataQuery } from '../types/bc.js';

export class ODataBuilder {
  private query: ODataQuery = {};

  /**
   * Add a filter condition
   */
  filter(condition: string): this {
    if (this.query.$filter) {
      this.query.$filter += ` and ${condition}`;
    } else {
      this.query.$filter = condition;
    }
    return this;
  }

  /**
   * Add an OR filter condition
   */
  orFilter(condition: string): this {
    if (this.query.$filter) {
      this.query.$filter += ` or ${condition}`;
    } else {
      this.query.$filter = condition;
    }
    return this;
  }

  /**
   * Select specific fields
   */
  select(fields: string[]): this {
    this.query.$select = fields.join(',');
    return this;
  }

  /**
   * Add ordering
   */
  orderBy(field: string, direction: 'asc' | 'desc' = 'asc'): this {
    if (this.query.$orderby) {
      this.query.$orderby += `,${field} ${direction}`;
    } else {
      this.query.$orderby = `${field} ${direction}`;
    }
    return this;
  }

  /**
   * Limit number of results
   */
  top(count: number): this {
    this.query.$top = count;
    return this;
  }

  /**
   * Skip number of results
   */
  skip(count: number): this {
    this.query.$skip = count;
    return this;
  }

  /**
   * Use skip token for pagination
   */
  skipToken(token: string): this {
    this.query.$skiptoken = token;
    return this;
  }

  /**
   * Include count in response
   */
  count(include: boolean = true): this {
    this.query.$count = include;
    return this;
  }

  /**
   * Build the query string
   */
  build(): string {
    const params = new URLSearchParams();
    
    Object.entries(this.query).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, String(value));
      }
    });

    return params.toString();
  }

  /**
   * Get the query object
   */
  toObject(): ODataQuery {
    return { ...this.query };
  }

  /**
   * Reset the builder
   */
  reset(): this {
    this.query = {};
    return this;
  }
}

/**
 * Helper functions for common filter operations
 */
export const odataHelpers = {
  /**
   * Create an equals filter
   */
  eq: (field: string, value: string | number | boolean): string => {
    if (typeof value === 'string') {
      return `${field} eq '${value}'`;
    }
    return `${field} eq ${value}`;
  },

  /**
   * Create a not equals filter
   */
  ne: (field: string, value: string | number | boolean): string => {
    if (typeof value === 'string') {
      return `${field} ne '${value}'`;
    }
    return `${field} ne ${value}`;
  },

  /**
   * Create a greater than filter
   */
  gt: (field: string, value: string | number): string => {
    if (typeof value === 'string') {
      return `${field} gt '${value}'`;
    }
    return `${field} gt ${value}`;
  },

  /**
   * Create a greater than or equal filter
   */
  ge: (field: string, value: string | number): string => {
    if (typeof value === 'string') {
      return `${field} ge '${value}'`;
    }
    return `${field} ge ${value}`;
  },

  /**
   * Create a less than filter
   */
  lt: (field: string, value: string | number): string => {
    if (typeof value === 'string') {
      return `${field} lt '${value}'`;
    }
    return `${field} lt ${value}`;
  },

  /**
   * Create a less than or equal filter
   */
  le: (field: string, value: string | number): string => {
    if (typeof value === 'string') {
      return `${field} le '${value}'`;
    }
    return `${field} le ${value}`;
  },

  /**
   * Create a contains filter
   */
  contains: (field: string, value: string): string => {
    return `contains(${field},'${value}')`;
  },

  /**
   * Create a starts with filter
   */
  startsWith: (field: string, value: string): string => {
    return `startswith(${field},'${value}')`;
  },

  /**
   * Create an ends with filter
   */
  endsWith: (field: string, value: string): string => {
    return `endswith(${field},'${value}')`;
  },

  /**
   * Create an in filter
   */
  in: (field: string, values: (string | number)[]): string => {
    const formattedValues = values.map(v => typeof v === 'string' ? `'${v}'` : String(v));
    return `${field} in (${formattedValues.join(',')})`;
  }
};

/**
 * Create a new OData builder instance
 */
export const createODataBuilder = (): ODataBuilder => new ODataBuilder();
