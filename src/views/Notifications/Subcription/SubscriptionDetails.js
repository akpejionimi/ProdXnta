import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
    Spinner,
    Container,
    Card,
    CardBody,
    CardHeader,
    Button,
    Col,
    Row,
    Table
} from "reactstrap";

import { getSingleSub } from "../../../components/Store/actions/sub";

class subscriptionDetail extends Component {
    componentDidMount = () => {
        const prodSubId = +this.props.match.params.prodSubId;
        this.props.onGetSingleSub(prodSubId);
        console.log(prodSubId);
        

    };
 
    render() {
        const btnStyle = {
            float: 'right',
           
          };
        // const {prodSub} = prodSub.find(prodSub => prodSub.prodSubId.toString() === this.props.match.params.prodSubId)
        const {sub } = this.props;
        console.log(sub);
        
        const subscriptionDetail = sub ? Object.entries(sub) : [['prodSubId', (<span><i className="text-muted icon-ban"></i> Not found</span>)]]
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col lg={{ size: 6, offset: 3 }} >
                        <Card>
                            <CardHeader className="tx-right">
                                <Link to={`/products/edit/${this.props.match.params.prodSubId}`}><Button style={btnStyle} color="outline-primary" size="lg">Edit Subscription</Button></Link>

                            </CardHeader>
                            <CardBody>
                                <Container>
                                    <h1>Details</h1>
                                    {this.props.isLoading ? (
                                        <div style={{ display: "flex", justifyContent: "center" }}>
                                            <Spinner color="dark" />
                                        </div>
                                    ) : (
                                            <Table responsive striped hover>
                                                <tbody>
                                                    {
                                                        subscriptionDetail.map(([key, value]) => {
                                                            return (

                                                                <tr key={key}>
                                                                    <td>{`${key}:`}</td>
                                                                    <td><strong>{value}</strong></td>
                                                                </tr>


                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </Table>
                                        )}
                                </Container>

                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                
            </div>

        );
    }
}

const mapStateToProps = state => ({
    sub: state.prodSub.prodSub,
    isLoading: state.prodSub.isLoading
});

const mapDispatchToProps = dispatch => ({
    onGetSingleSub:prodSubId => dispatch(getSingleSub(prodSubId))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(subscriptionDetail);