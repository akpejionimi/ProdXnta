import React, { Component } from "react";
import { Link } from "react-router-dom";
import EditProduct from "../views/Notifications/Modals/EditSavingsProduct";
// import {connect} from 'react-redux'

import {
  Card,
  CardBody,
  Row,
  Col,
  CardHeader,
  Table,
  Button
} from "reactstrap";

// import { deleteCustomer, deleteCustomerInit } from "../components/Store/actions/customer";
function SavingsProductRow(props) {
  const savingsProduct = props.savingsProduct
  const savingsProductLink = `/savings-product/${savingsProduct.productId}`
  // const savProdEditLink = `/savings-products/edits/${savingsProduct.productId}`
  const setEditingProduct = (product) => {
    props.EditProduct(product)
  }


  return (
    <tr key={savingsProduct.productId.toString()}>
      <td><Link to={savingsProductLink}>{savingsProduct.productName}</Link></td>
      <td> &#8358; {savingsProduct.moneyValue}</td>
      <td>{savingsProduct.productDuration} <span>days</span></td>
      {/* <td><Link to={CustomerLink}><Badge color={getBadge(customer.status)}>{customer.status}</Badge></Link></td> */}
      <td>
        <Button color="primary" onClick={() => setEditingProduct(savingsProduct)}><i className="fa fa-edit"></i></Button>
        {/* <Link to={savProdEditLink}><Button color="primary"><i className= "fa fa-edit"></i></Button></Link> */}

      </td>
    </tr>
  )
}

class SavingsProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editingProductId: null
    }

    this.EditProduct = this.EditProduct.bind(this);
  }

  EditProduct(product) {    
    this.setState({
      editingProduct: product && product.productId ? product : null
    });
  }

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
                    <SavingsProductRow key={index} savingsProduct={savingsProduct} EditProduct={this.EditProduct}
                    // removeCustomer={this.removeCustomer}
                    />
                  )}
                </tbody>
              </Table>

              {this.state.editingProduct
                && <EditProduct savingsProduct={this.state.editingProduct} onCloseModal={this.EditProduct} />}

              {/* <EditProduct savingsProduct={this.props.savingsProducts[0]} onCloseModal={this.EditProduct} />  */}
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


