import React, { Component } from 'react';
import { connect } from "react-redux";
import { Spinner } from "reactstrap";
import { Card, Col, Row } from 'reactstrap';


import CustomerList from '../../../components/CustomerList'
import SearchBox from '../../../components/SearchBox'
import { getCustomers } from "../../../components/Store/actions/customer";


class Customers extends Component {
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
      searchField: e.target.value
    })
  }
    render() {
      const filterCustomer = this.props.customers.filter(customer =>{
        return customer.fullName.toLowerCase().includes(this.state.searchField.toLowerCase())
      })
      return (
        <div className="animated fadeIn">
           <div className="tc">
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
                        <CustomerList customers={filterCustomer} />
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
    // isAuth: state.auth.token !== null,

  });

  const mapDispatchToProps = dispatch => ({
    onGetCustomers: () => dispatch(getCustomers())
  });

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Customers);

