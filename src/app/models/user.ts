export interface User {
  results: {
    name: {
      first: string;
      last: string;
    };
  };
  email: string;
  dob: {
    date: string;
  };
  location: {
    street: string
  };
  cell: string;
  login: {
    password: string;
  };
  picture: {
    large: string;
  };
}
