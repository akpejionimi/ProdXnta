import React, { Component } from 'react';
import { connect } from 'react-redux';
// import * as dateFns from 'date-fns';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  FormGroup,
  Input,
  Label,
  Alert,
  Spinner,
  Container,
  Form,
} from 'reactstrap';
import store from '../../../components/Store';
import { addSub, addSubInit } from "../../../components/Store/actions/sub";
import { getCustomers } from "../../../components/Store/actions/customer";
// import CustomerList from "../../../components/CustomerList"
import { getSavingsProduct } from "../../../components/Store/actions/savingsproduct";


class AddSubcription extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      large: false,
      largeView: false,
      productId: "",
      customerId: "",
      signUpDate: "",
      success: false
    };

    this.toggle = this.toggle.bind(this);
    this.toggleLarge = this.toggleLarge.bind(this);
    this.toggleLargeView = this.toggleLargeView.bind(this);
    this.toggleSuccess = this.toggleSuccess.bind(this);
    this.isLoading = this.isLoading.bind(this)

    let subCreationAction = false;
    store.subscribe(() => {
      const newVal = store.getState().prodSub.prodSubCreated;

      if (subCreationAction !== newVal && newVal) {
        subCreationAction = newVal;
        this.toggleSuccess();
      }
    });
  }

  componentDidMount() {
    this.props.onGetCustomers();
    this.props.onGetSavingsProduct();

  }


  toggleSuccess() {
    this.setState({
      success: !this.state.success,
    });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  toggleLarge() {
    this.setState({
      large: !this.state.large,
    });
  }

  toggleLargeView() {
    this.setState({
      largeView: !this.state.largeView,
    });
  }
  onChanged = e => {
    this.setState({
      [e.target.name]: e.target.value
    });

  };

  save = e => {
    e.preventDefault();
    e.target.reset();
    const formData = {
      productId: this.state.productId,
      signUpDate: this.state.signUpDate,
      customerId: this.state.customerId,
    };
    this.props.onAddSub(JSON.stringify(formData));
    console.log(formData);

  };

  isLoading() {
    return this.props.isLoadingProdSub || this.props.isLoadProduct || this.props.isLoadingCustomer
  }

  render() {
    return (
      <div className="animated fadeIn"> 
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Product Subscription
              </CardHeader>
              <CardBody>
                <Button onClick={this.toggleLarge} className="mr-1">Add Subscription</Button>
                <Modal isOpen={this.state.large} toggle={this.toggleLarge}
                  className={'modal-lg ' + this.props.className}>
                  <ModalHeader toggle={this.toggleLarge}>Savings Product</ModalHeader>
                  <ModalBody>
                    <Container className="card-design">
                      <Row>
                        <Col md={{ size: 12 }}>
                          <Card>
                            <CardHeader tag="h2">Add Subscription</CardHeader>
                            <CardBody>
                              {/* {this.props.customerCreated && !this.state.customerCreationAction ? this.openModal() : ""} */}
                              <Form onSubmit={this.save} action="POST" encType="application/json">
                                {this.props.error && (
                                  < Alert color="danger">{this.props.error.msg}</Alert>
                                )}
                                <FormGroup>
                                  <Row>
                                    <Col md={{ size: 6 }}>
                                      <FormGroup>
                                        <Label for="name">Product Name</Label>
                                        <select className="form-control"
                                          name="productId"
                                          id="productId"
                                          required="required"
                                          onChange={this.onChanged}>
                                          <option>Select Product</option>
                                          {this.props.savingsProducts.map((savingsProduct, index) => {
                                            return <option key={index} value={savingsProduct.productId} >
                                              {savingsProduct.productName}
                                            </option>
                                          })}
                                        </select>
                                      </FormGroup>
                                    </Col>
                                    <Col md={{ size: 6 }}>
                                      <FormGroup>
                                        <Label for="name">Select Customer</Label>
                                        <select className="form-control"
                                          name="customerId"
                                          id="customerId"
                                          required="required"
                                          onChange={this.onChanged}>
                                          <option>Select Customer</option>
                                          {this.props.customers.map((customer, index) => {
                                            return <option key={index} value={customer.customerId} >
                                              {customer.fullName}
                                            </option>
                                          })}
                                        </select>
                                      </FormGroup>
                                    </Col>
                                  </Row>
                                </FormGroup>

                                <FormGroup>
                                  <Row>
                                    <Col md={{ size: 6 }}>
                                      <FormGroup>
                                        <Label for="SignUp Date">SignUp Date</Label>
                                        <Input
                                          type="date"
                                          name="signUpDate"
                                          id="signUpDate"
                                          onChange={this.onChanged} />
                                      </FormGroup>
                                    </Col>
                                  </Row>
                                </FormGroup>
                                {this.isLoading() ? (
                                  <Spinner color="danger" />
                                ) : (
                                    <Button color="success">Create</Button>
                                  )}
                              </Form>
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Card>
                            <CardBody>
                              <Modal isOpen={this.state.success} toggle={this.toggleSuccess}
                                className={'modal-success ' + this.props.className}>
                                <ModalHeader toggle={this.toggleSuccess}>Subscription Created</ModalHeader>
                                <ModalBody>
                                  Created Successfully!
                                </ModalBody>
                                <ModalFooter>
                                  <Button color="secondary" onClick={this.toggleSuccess}>Ok</Button>
                                </ModalFooter>
                              </Modal>
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
                    </Container>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="secondary" onClick={this.toggleLarge}>Cancel</Button>
                  </ModalFooter>
                </Modal>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  isLoadingProdSub: state.prodSub.isLoading,
  isLoadProduct: state.savingsProduct.isLoading,
  isLoadingCustomer: state.customer.isLoading,
  prodSubCreated: state.prodSub.prodSubCreated,
  error: state.prodSub.error,
  customers: state.customer.customers,
  savingsProducts: state.savingsProduct.savingsProducts,
});

const mapDispatchToProps = dispatch => ({
  onAddSubInit: () => dispatch(addSubInit()),
  onAddSub: prodSubData => dispatch(addSub(prodSubData)),
  onGetCustomers: () => dispatch(getCustomers()),
  onGetSavingsProduct: () => dispatch(getSavingsProduct())
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddSubcription);

