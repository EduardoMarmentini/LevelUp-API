import ICustomer from "../models/customer-model";

// Exemplo básico de service
class CustomerService {
    async findAll(): Promise<any[]> {

        const customers : Array<ICustomer> = [
        { name: "John Doe", email: "john.doe@example.com", password: "password123" },
        { name: "Jane Smith", email: "jane.smith@example.com", password: "securepass456" },
        { name: "Alice Johnson", email: "alice.johnson@example.com", password: "mypassword789" },
        { name: "Bob Brown", email: "bob.brown@example.com", password: "passw0rd321" },
        { name: "Charlie Davis", email: "charlie.davis@example.com", password: "strongpass654" },
    ];
      return customers;
    }
  }
  
  export default new CustomerService();