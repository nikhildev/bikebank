function transformFields(fields: object) {
  const data = {};
  console.log(fields);
  
  for (const field in Object.keys(fields)) {
    
    if (fields.hasOwnProperty(field)) {
      console.log(field);

      switch (field) {
        case 'booleanValue':
          data[field] = fields[field].booleanValue;
          break;
        case 'stringValue':
          data[field] = fields[field].stringValue;
          break;
        case 'integerValue':
          data[field] = fields[field].integerValue;
          break;
      }
    }
  }
  console.log(data);
  
  return data;
}

export const transformRestData = (response: any) => {
  let data: any;

  if (response.data.documents) {
    data = [];
    response.data.documents.forEach((document: object) => {
      const newDoc = transformFields(document['fields']);
      data.push(newDoc);
    });
  } else {
    data = response.data;
  }

  const transformedData = {
    data,
    headers: response.headers,
    status: response.status,
  };
  return transformedData;
}