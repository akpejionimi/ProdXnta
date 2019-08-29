import React, { Component } from 'react';
import { connect } from "react-redux";
import { Spinner } from "reactstrap";
import {Card,Col, Row } from 'reactstrap';


import SubscriptionList from '../../../components/SubscriptionList'
import { getSubs } from "../../../components/Store/actions/sub";


class AllSubscription extends Component {
  componentDidMount() {
    this.props.onGetSub();
    
  }
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <div className="prodSubs">
                <div className="prodSubs">
                  {this.props.isLoading ? (
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <Spinner color="dark" />
                    </div>
                  ) : (
                      <SubscriptionList prodSubs={this.props.prodSubs} />
                    )}
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  prodSubs: state.prodSub.prodSubs,
  isLoading: state.prodSub.isLoading,


});

const mapDispatchToProps = dispatch => ({
  onGetSub: () => dispatch(getSubs())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllSubscription);

