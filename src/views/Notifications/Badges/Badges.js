import React, { Component } from 'react';
import { connect } from "react-redux";
import { Spinner } from "reactstrap";
import { Card, Col, Row } from 'reactstrap';

import SearchBox from '../../../components/SearchBox'
import PaymentList from '../../../components/PaymentList'
import { getCustomers } from "../../../components/Store/actions/customer";


class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchField: ""
    }
  }
    componentDidMount() {
      this.props.onGetCustomers();
    }

    onSearchChange = (e) => {
      // console.log(e.target.value);
      this.setState({
        searchField : e.target.value
      })
       
    }
    render() {
      const filterCustomer = this.props.customers.filter(customer =>{
        return customer.fullName.toLowerCase().includes(this.state.searchField.toLowerCase())
      })
      // console.log(filterCustomer);
      return (
        <div className="animated fadeIn">
          <div className="tr">
            <SearchBox searchChange={this.onSearchChange}/>
          </div>
          <Row>
            <Col xl={12}>
              <Card>
                <div className="customers">
                  <div className="customers">
                    {this.props.isLoading ? (
                      <div style={{ display: "flex", justifyContent: "center" }}>
                        <Spinner color="dark" />
                      </div>  
                    ) : (
                        <PaymentList customers={filterCustomer} />
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
    customers: state.customer.customers,
    isLoading: state.customer.isLoading,

  });

  const mapDispatchToProps = dispatch => ({
    onGetCustomers: () => dispatch(getCustomers())
  });

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Payment);

