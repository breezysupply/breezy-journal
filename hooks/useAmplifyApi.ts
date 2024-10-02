'use client'

import { API, graphqlOperation } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api-graphql';

export function useAmplifyApi() {
  const query = async <T>(query: string, variables?: object): Promise<T> => {
    try {
      const response = (await API.graphql(
        graphqlOperation(query, variables)
      )) as GraphQLResult<T>;
      return response.data as T;
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  };

  const mutate = async <T>(mutation: string, variables?: object): Promise<T> => {
    try {
      const response = (await API.graphql(
        graphqlOperation(mutation, variables)
      )) as GraphQLResult<T>;
      return response.data as T;
    } catch (error) {
      console.error('Error executing mutation:', error);
      throw error;
    }
  };

  return { query, mutate };
}
