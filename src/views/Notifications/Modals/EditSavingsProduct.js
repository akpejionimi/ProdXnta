import React, { Component } from 'react';
import { connect } from 'react-redux';
// import * as dateFns from 'date-fns';
// import Sub from '../../../subs'
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
import { editSavingsProduct, editSavingsProductInit } from "../../../components/Store/actions/savingsproduct";

class EditProduct extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editMode: true,
            productName: this.props.savingsProduct.productName,
            moneyValue: this.props.savingsProduct.moneyValue,
            productDuration: this.props.savingsProduct.productDuration
        }
    }

    onChanged = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    save = e => {
        e.preventDefault();
        const formData = {
            productName: this.state.productName,
            productDuration: this.state.productDuration,
            moneyValue: this.state.moneyValue
        };

        this.props.onEditSavingsProduct(JSON.stringify(formData), this.props.savingsProduct.productId);
    };

    render() {
        return (
            <div className="animated fadeIn">
                <Modal isOpen={this.state.editMode} toggle={this.props.onCloseModal}
                    className={'modal-lg ' + this.props.className}>
                    <ModalHeader toggle={this.props.onCloseModal}>Product</ModalHeader>
                    <ModalBody>
                        <Container className="card-design">
                            <Row>
                                <Col md={{ size: 12 }}>
                                    <Card>
                                        <CardHeader tag="h2">Edit Product</CardHeader>
                                        <CardBody>                                            
                                            <Form onSubmit={this.save} action="POST" encType="application/json">
                                                {this.props.error && (
                                                    < Alert color="danger">{this.props.error.msg}</Alert>
                                                )}
                                                <FormGroup>
                                                    <Row>
                                                        <Col md={{ size: 6 }}>
                                                            <FormGroup>
                                                                <Label for="name">Product Name</Label>
                                                                <Input
                                                                    type="text"
                                                                    name="productName"
                                                                    id="productName"
                                                                    placeholder="Product Name"
                                                                    // required="required"
                                                                    defaultValue={this.props.savingsProduct && this.props.savingsProduct.productName}
                                                                    onChange={this.onChanged}
                                                                />
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md={{ size: 6 }}>
                                                            <FormGroup>
                                                                <Label for="money Value">Money Value</Label>
                                                                <Input
                                                                    type="text"
                                                                    placeholder="Enter whole (&#8358;) or zero for none"
                                                                    min="0"
                                                                    max="10000"
                                                                    step="1"
                                                                    // value=""
                                                                    name="moneyValue"
                                                                    id="moneyValue"
                                                                    // required="required"
                                                                    // type="decimal"
                                                                    // name="moneyValue"
                                                                    // id="moneyValue"
                                                                    // placeholder="Money Value"
                                                                    defaultValue={this.props.savingsProduct && this.props.savingsProduct.moneyValue}
                                                                    onChange={this.onChanged}
                                                                />
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                </FormGroup>

                                                <FormGroup>
                                                    <Row>
                                                        <Col md={{ size: 6 }}>
                                                            <FormGroup>
                                                                <Label for="Product Duration">Product Duration</Label>
                                                                <Input
                                                                    type="text"
                                                                    name="productDuration"
                                                                    id="productDuration"
                                                                    placeholder="Product Duration"
                                                                    maxLength="4"
                                                                    // required="required"
                                                                    defaultValue={this.props.savingsProduct && this.props.savingsProduct.productDuration}
                                                                    onChange={this.onChanged} />
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                </FormGroup>
                                                {this.props.isLoading ? (
                                                    <Spinner color="danger" />
                                                ) : (
                                                        <Button color="success">Update</Button>


                                                    )}
                                            </Form>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.props.onCloseModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.props.savingsProductUpdated} toggle={this.props.onCloseModal}
                    className={'modal-success ' + this.props.className}>
                    <ModalHeader toggle={this.toggleSuccess}>DONE</ModalHeader>
                    <ModalBody>
                        Update Successful!
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.props.onCloseModal}>Ok</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    isLoading: state.savingsProduct.isLoading,
    savingsProductUpdated: state.savingsProduct.savingsProductUpdated,
    error: state.savingsProduct.error
});

const mapDispatchToProps = dispatch => ({
    onEditSavingsProductInit: (productId) => dispatch(editSavingsProductInit(productId)),
    onEditSavingsProduct: (savingsProductData, productId) => dispatch(editSavingsProduct(savingsProductData, productId))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditProduct);
