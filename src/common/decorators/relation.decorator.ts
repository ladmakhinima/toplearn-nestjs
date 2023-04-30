export interface RelationProperties {
  [FindOneKey]?: { [key: string]: boolean };
  [FindAllKey]?: { [key: string]: boolean };
}

export const FindOneKey = Symbol('findOne');
export const FindAllKey = Symbol('findAll');

export const Relation = (relationProperties: RelationProperties) => {
  return (target: any) => {
    return Reflect.defineMetadata('_relation', relationProperties, target);
  };
};

export const GetRelation = (target: any) =>
  Reflect.getMetadata('_relation', target) || {};
