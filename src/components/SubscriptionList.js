import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import {connect} from 'react-redux'
// import * as dateFns from "date-fns";

import {
  Card,
  CardBody,
  //   Badge,
  Row,
  Col,
  CardHeader,
  Table,
  // Button
} from "reactstrap";


function SubscriptionRow(props) {
  const prodSub = props.prodSub
 
  return (
    <tr key={prodSub.productId.toString()}>
      <td>{prodSub.Customer.fullName}</td>
      <td>{prodSub.Savings_Product.productName}</td>
      <td>{prodSub.signUpDate}</td>
      <td>
      
      </td>
    </tr>
  )
}

class SubscriptionList extends Component {
  constructor(props) {
    super(props);
    this.state = { }
  }

  render() {
    return (
      <Row>
        <Col xl={12}>
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify"></i> Subscription <small className="text-muted">List</small>
            </CardHeader>
            <CardBody>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th scope="col">Customer Name</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">SignUp Date</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.prodSubs.map((prodSub, index) =>
                    <SubscriptionRow key={index} prodSub={prodSub}
                    />
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


export default SubscriptionList


