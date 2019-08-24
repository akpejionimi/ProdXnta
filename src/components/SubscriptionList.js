import React, { Component } from "react";
import { Link } from "react-router-dom";
// import EditProduct from "../views/Notifications/Modals/EditSavingsProduct"
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

// import { deleteCustomer, deleteCustomerInit } from "../components/Store/actions/customer";

function SubscriptionRow(props) {

  const prodSub = props.prodSub
  const savingsProductLink = `/savings-product/${savingsProduct.productId}`

  return (
    <tr key={savingsProduct.productId.toString()}>
      <td> to={savingsProductLink}>{savingsProduct.productName}</td>
      <td> &#8358; {savingsProduct.moneyValue}</td>
      <td>{savingsProduct.productDuration}</td>
      {/* <td><Link to={CustomerLink}><Badge color={getBadge(customer.status)}>{customer.status}</Badge></Link></td> */}
      <td>
        <EditProduct savingsProduct = {savingsProduct} />
        
        {/* <Link to={savProdEditLink}><Button color="primary"><i className= "fa fa-edit"></i></Button></Link> */}
        {/* <Button onClick={() => props.removeCustomer(customer)} color="danger">Remove</Button> */}
      </td>
    </tr>
  )
}

class SavingsProductList extends Component {
  constructor(props) {
    super(props);
    this.state = { }

    // this.removeCustomer = this.removeCustomer.bind(this)
  }
  //   removeCustomer (customer) {
  //     console.log(this.props);

  //     this.props.onDeleteCustomer(customer.customerId)
  //   }

  render() {
    return (
      <Row>
        <Col xl={12}>
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify"></i> Savings Product <small className="text-muted">List</small>
            </CardHeader>
            <CardBody>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th scope="col">Product Name</th>
                    <th scope="col">Money Value</th>
                    <th scope="col">Product Duration</th>
                    <th scope="col">Actions</th>

                  </tr>
                </thead>
                <tbody>
                  {this.props.savingsProducts.map((savingsProduct, index) =>
                    <SavingsProductRow key={index} savingsProduct={savingsProduct}
                    // removeCustomer={this.removeCustomer}
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
// const mapStateToProps = state => ({
//   customer: state.customer.customer,
//   customerDeleted: state.customer.customerDeleted
// });

// const mapDispatchToProps = dispatch => ({
//   onDeleteCustomerInit: (customerId) => dispatch(deleteCustomerInit(customerId)),
//   onDeleteCustomer: customerId => dispatch(deleteCustomer(customerId))
// });

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(CustomerList);

export default SavingsProductList


