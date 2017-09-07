
export const Optional = (value) => { return { isOptional: true, value } };
Optional.isOptional = obj => obj.isOptional;
