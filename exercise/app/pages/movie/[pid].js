import React, { PureComponent } from 'react';
import { createForm } from 'rc-form';
import { Button, Card, Elevation, Icon, NumericInput, InputGroup, FormGroup } from "@blueprintjs/core";
import { Container } from 'components/container';
import Link from 'next/link';
import Request from 'helper/request';
import CashExchange from 'helper/cash';
import { MenuWidthScrollExpand } from 'components/menu';
import { Row, Column } from 'components/flex'
import styled from 'styled-components';

const MenuItem = MenuWidthScrollExpand.Item

const Wrapper = styled.div`
  background: #f3f3f3;
  min-height: 100vh;
  padding: 0;
  text-align: center;
  overflow: hidden;
  h1 {
    font-size: 2em;
  }
  .bp3-navbar-heading {
    font-size: 1.2em;
    font-weight: bold;
  }
  .how-to-buy {
    color: #FFF;
  }
`;

const Poster = styled.div`
  width: 170px;
  height: 250px;
  background: url(${props => props.src});
  background-size: cover;
`;

const Result = styled.div`
  padding: 10px;
  margin-bottom: 50px;
  .moviecard {
    overflow: hidden;
    text-align: left;
    width: 100%;
    padding: 0px;
    box-sizing: border-box;
    position: relative;
    h3 {
      margin: 0px;
      margin-bottom: 10px;
      font-size: 1.6em;
    }
    .detail {
      height: 100%;
      padding: 10px;
      hr {
        border: none;
        border-top: 1px solid #ccc;
      }
      > ${Row} {
        flex-direction: column;
        height: 100%;
      }
    }
    .price {
      border: 1px solid #ccc;
      width: 120px;
      padding: 10px;
      border-radius: 10px;
      span {
        display: inline-block;
      }
      ${Column}:first-child {
        font-size: 2em;
      }
      ${Column}:last-child {
        font-size: 0.7em;
        text-align: center;
        float: right;
        font-weight: bold;
      }
    }
  }
`;

const StepFlow = styled.div`
  padding: 10px;
  ${Column} {
    padding-right: 5px;
    &:last-child {
      padding-right: 0px;
    }
  }
  .step {
    font-size: 1em;
    font-weight: bold;
    display: flex;
    width: 100%;
    // border: 1px solid #ccc;
    border-radius: 5px;
    overflow: hidden;
    span {
      display: inline-block;
      background: #FFF;
    }
    .bp3-icon {
      // margin-left: 10px;
    }
    > span:first-child {
      font-size: 1.2em;
      padding-right: 5px;
      width: 60px;
      height: 40px;
      line-height: 40px;
      // margin-right: 1px;
      position: relative;
      overflow: hidden;
      &:after {
        content: "";
        position: absolute;
        width: 0px;
        right: 0px;
        top: -2px;
        height: 0px;
        border-top: 22px solid transparent;
        border-bottom: 22px solid transparent;
        border-left: 10px solid #26323c;
      }
      &:before {
        content: "";
        position: absolute;
        right: 1px;
        top: -2px;
        width: 0px;
        height: 0px;
        border-top: 22px solid transparent;
        border-bottom: 22px solid transparent;
        border-left: 10px solid #FFF;
        z-index: 1;
      }
    }
    > span:last-child {
      width: 100%;
      line-height: 40px;
    }
  }
`;

const PaymentBox = styled.div`
  img {
    max-width: 100%;
    padding:5px;
    &.coin {
      width: 100px;
    }
  }
  text-align: left;
  padding: 30px;
  h2 {
    margin: 0px;
    margin-bottom: 10px;
  }
  .bp3-form-helper-text {
    color: red;
  }
`;

const Ticket = styled.div`
  margin: 30px 0;
  padding: 20px;
  background-color: #edede7;
  height: 200px;
  background-image: radial-gradient(circle at center, #26323d 3px, transparent 4px), radial-gradient(circle at center, #26323d 3px, transparent 4px);
  background-size: 14px 12px;
  background-position: center -6px, center calc(100% + 6px);
  background-repeat: repeat-x;
`;

class Home extends PureComponent {
  static async getInitialProps({ query }) {
    const { pid, time } = query;
    const movies = await Request(`/movies/${pid}`);
    return {
      data: movies.data,
      query
    };
  }

  constructor(props) {
    super(props)
    this.state = {
      step: 0,
      seat: 1,
      cash: 0,
      change: null
    };
    this.onCheckout = this.onCheckout.bind(this);
  }

  onCheckout() {
    const { data, query } = this.props;
    const { pid, time } = query;
    const { price } = data;
    const { seat } = this.state;
    this.props.form.validateFields(async (error, { cash, email }) => {
      if(!error) {
        const change = CashExchange(Number(cash), Number(seat) * price);
        if(change instanceof Error) {
          alert('not enought money');
        } else {
          const data = await Request.post(`/buy/${pid}`, { email, seat, showtime: time });
          this.setState({ step: 2, change });
        }
        // alert('success');
      }
    })
  }

  render () {
    const { step, seat, change } = this.state;
    const { form, data, query } = this.props;
    const { time } = query;
    const { youtube, title, price, description, poster } = data;
    const { getFieldError, getFieldDecorator } = form;
    return(
      <Wrapper>
        <Container>
          <iframe width="100%" height="315" src={`https://www.youtube.com/embed/${youtube}?autoplay=0&showinfo=0&controls=0&controls=0`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
          <nav class="bp3-navbar bp3-dark">
            <div class="bp3-navbar-group bp3-align-left">
              <Link href="/">
                <Button icon="arrow-left">BACK</Button>
              </Link>
            </div>
            <div className="bp3-navbar-group bp3-align-right">
              Blue - We Make Old Movie Alive
            </div>
          </nav>
          <Result>
            <Card className="moviecard bp3-dark" interactive={true} elevation={Elevation.TWO}>
              <Row>
                <Column>
                  <Poster src={`/images/poster/${poster}`} />
                </Column>
                <Column fill>
                  <div className="detail">
                    <Row space-between>
                      <Column>
                        <h3>{title}</h3>
                        <label>Theatre 1 <Icon icon="volume-down" iconSize={18} /> Eng</label>
                        <hr />
                        <p>{description}</p>
                      </Column>
                      <Column>
                        <Row space-between>
                          <Column>
                            <div className="showtimes">
                              <p><Icon icon="calendar" iconSize={18} /> 03/07/2019</p>
                              <p><Icon icon="time" iconSize={18} /> 2hrs 9mins</p>
                            </div>
                          </Column>
                          <Column>
                            <div className="price">
                              <Row space-between alignItem="center">
                                <Column>{price}</Column>
                                <Column>BATH /<br/>SEAT</Column>
                              </Row>
                            </div>
                          </Column>
                        </Row>
                      </Column>
                    </Row>
                  </div>
                </Column>
              </Row>
            </Card>
            <div className="how-to-buy">
              <h2>How to buy a ticket</h2>
              <p>1. select seats. 2. payment and put your infomation. 3. get your ticket</p>
            </div>
            <StepFlow>
              <Row>
                <Column fill>
                  <div className="step">
                    <span>
                      { step > 0 ? <Icon icon="tick-circle" iconSize={20}/>: 1}
                    </span>
                    <span>Select</span>
                  </div>
                </Column>
                <Column fill>
                  <div className="step">
                    <span>{ step > 1 ? <Icon icon="tick-circle" iconSize={20}/>: 2}</span>
                    <span>Payment</span>
                  </div>
                </Column>
                <Column fill>
                  <div className="step">
                    <span>{ step > 2 ? <Icon icon="tick-circle" iconSize={20}/>: 3}</span>
                    <span>Success</span>
                  </div>
                </Column>
              </Row>
            </StepFlow>
            <Row space-between>
              <Column fill>
                <Ticket>
                  <p style={{ textAlign: 'left' }}>Review Your information</p>
                  <hr />
                  <h3>{title}</h3>
                  <Row space-around>
                    <Column><p>Amount: {seat} seats</p></Column>
                    <Column><p>Theatre: 1</p></Column>
                  </Row>
                  <Row space-around>
                    <Column><p>Showtime: {time}</p></Column>
                    <Column><p>Total: { seat * price }</p></Column>
                  </Row>
                  <p>Thank you!</p>
                  {/* <p>Amount: {seat} seats</p>
                  <p>Theatre: 1</p> */}
                  {/* <p>Showtime: {time}</p>
                  <p>Total: { seat * price }</p> */}
                  {/* <Card elevation={Elevation.TWO}>

                  </Card> */}
                </Ticket>
              </Column>
              <Column fill>
                {step === 0 ? (
                  <PaymentBox>
                    <Card elevation={Elevation.TWO}>
                      <h2>เลือกจำนวนที่นั่ง</h2>
                      <NumericInput onValueChange={value => this.setState({ seat: value })} large value={seat} />
                      <br />
                      <Button intent="primary" onClick={() => this.setState({ step: 1 })} large fill>Next</Button>
                    </Card>
                  </PaymentBox>
                ): ''}
                {step === 1 ? (
                  <PaymentBox>
                    <Card elevation={Elevation.TWO}>
                      <h2>ใส่เงินสดและอีเมล</h2>
                      <FormGroup
                          helperText={getFieldError('cash')}
                          label="ใส่จำนวนเงิน"
                          labelFor="text-input"
                          // labelInfo="(required)"
                          // inline
                      >
                        {getFieldDecorator('cash', {
                          validateTrigger: 'onBlur',
                          initialValue: '500',
                          rules: [{ required: true, message: 'กรุณากรอก' }],
                        })(<NumericInput buttonPosition="none" large/>)}
                      </FormGroup>
                      <FormGroup
                          helperText={getFieldError('email')}
                          label="อีเมล"
                          labelFor="text-input"
                          labelInfo="(เพื่อรับตั๋ว)"
                          // inline
                      >
                        {getFieldDecorator('email', {
                          validateTrigger: 'onBlur',
                          initialValue: 'adisakchaiyakul@gmail.com',
                          rules: [{ required: true, message: 'กรุณากรอก' }, { type: 'email', message: 'กรุณากรอกอีเมลให้ถูกต้อง' }],
                        })(<InputGroup large />)}
                      </FormGroup>
                      <Button intent="primary" onClick={this.onCheckout} large fill>Checkout</Button>
                    </Card>
                  </PaymentBox>
                ): ''}
                {step === 2 ? (
                  <PaymentBox>
                    <Card elevation={Elevation.TWO}>
                      <h2>Success</h2>
                      <p>get your ticket in mailbox</p>
                      <Link href="/"><Button fill intent="success">Go Home</Button></Link>
                      <br />
                      <p>don't forgot to get your change!</p>
                      <br />
                      {
                        change.map(({ banknote, num }) => {
                          let i;
                          let elm =[];
                          for (i = 0; i < num; i++) {
                            elm = [...elm, <img key={`${banknote}-${i}`} className={banknote > 10 ? '': 'coin'} src={`/images/bank/${banknote}.${banknote > 10 ? 'jpg': 'png'}`} />];
                          }
                          return elm;
                        })
                      }
                    </Card>
                  </PaymentBox>
                ): ''}
              </Column>
            </Row>
          </Result>
        </Container>
      </Wrapper>
    )
  }
}

export default createForm()(Home);
