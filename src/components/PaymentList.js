import React, {Component} from "react";
import { Link } from "react-router-dom";

import {
  Card,
  CardBody,
  Row,
  Col,
  CardHeader,
  Table,
  Button
} from "reactstrap";


function CustomerRow(props) {
  const customer = props.customer
  const CustomerLink = `/customers/${customer.customerId}`
  
  return (
    <tr key={customer.customerId.toString()}>
      <td><Link to={CustomerLink}>{customer.fullName}</Link></td>
      <td>{customer.accountNo}</td>
      <td><Link to={CustomerLink}><Button color="primary">Select</Button></Link></td>
    </tr>
  )
}

class PaymentList extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }
  render(){
    return (
      <Row>
        <Col xl={12}>
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify"></i> Product Payment <small className="text-muted">List</small>
            </CardHeader>
            <CardBody>
              <Table responsive hover>
                <thead>
                  <tr>
                    {/* <th scope="col">CustomerId</th> */}
                    <th scope="col">FullName</th>
                    <th scope="col">Account No.</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.customers.map((customer, index) =>
                    <CustomerRow key={index} customer={customer} removeCustomer={this.removeCustomer}/>
                  )}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
   
    );
  }
};
export default PaymentList




