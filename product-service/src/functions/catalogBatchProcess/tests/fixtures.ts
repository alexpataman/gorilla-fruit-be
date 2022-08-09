export const mockedBatchRequest = [
  {
    body: '{"count":1,"description":"Short Product Description1","price":2.4,"title":"Product1"}',
  },
  {
    body: '{"count":4,"description":"Short Product Description1","price":2.4,"title":"Product2"}',
  },
];

export const mockedDbResponse = {
  rows: [
    {
      count: 4,
      description: 'Short Product Description1',
      id: '7567ec4b-b10c-48c5-9345-fc73c48a80aa',
      price: 2.4,
      title: 'ProductOne Test',
    },
  ],
};
