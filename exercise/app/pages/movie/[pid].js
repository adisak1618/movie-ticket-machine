import React, { PureComponent } from 'react';
import { createForm } from 'rc-form';
import { Button, Card, Elevation, Icon, NumericInput, InputGroup, FormGroup } from "@blueprintjs/core";
import { Container } from 'components/container';
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
`;

const Poster = styled.div`
  width: 130px;
  height: 200px;
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

const SelectSeat = styled.div`
  padding: 30px;
`;

const CashPayment = styled.div`
  padding: 30px;
  .bp3-form-helper-text {
    color: red;
  }
`;

class Home extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      step: 0,
      seat: 1,
      cash: 0
    };
    this.onCheckout = this.onCheckout.bind(this);
  }

  onCheckout() {
    this.props.form.validateFields((error, value) => {
      if(!error) {
        alert('success');
      }
    })
  }

  render () {
    const { step } = this.state;
    const { form } = this.props;
    const { getFieldError, getFieldDecorator } = form;
    return(
      <Wrapper>
        <Container>
          <iframe width="100%" height="315" src="https://www.youtube.com/embed/-oQO-kGU2lA?autoplay=0&showinfo=0&controls=0&controls=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
          <Result>
            <Card className="moviecard bp3-dark" interactive={true} elevation={Elevation.TWO}>
              {/* <span class="label1">
                ปปช
              </span>
              <h3><a href="#">นายจรัล สารรักษ์ </a></h3>
              <p>สถานะ: มีมูลความผิด</p>
              <p>ข้อกล่าวหา: ทุจริตในการก่อสร้างเขื่อน</p> */}
              <Row>
                <Column>
                  <Poster src="/images/poster/mitty.jpg" />
                </Column>
                <Column fill>
                  <div className="detail">
                    <Row space-between>
                      <Column>
                        <h3>The Secret Life of Wallter Mitty</h3>
                        <label>Theatre 1 <Icon icon="volume-down" iconSize={18} /> Eng</label>
                        <hr />
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
                                <Column>299</Column>
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
            <h2>How to bye a ticket</h2>
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
            {step === 0 ? (
              <SelectSeat>
                <Card elevation={Elevation.TWO}>
                  <h2>เลือกจำนวนที่นั่ง</h2>
                  <Row space-between>
                    <Column fill>
                      <NumericInput onValueChange={value => this.setState({ seat: value })} large max={10} value={1}/>
                    </Column>
                    <Column fill>
                      <Button onClick={() => this.setState({ step: 1 })} large fill>Next</Button>
                    </Column>
                  </Row>
                </Card>
              </SelectSeat>
            ): ''}
            {step === 1 ? (
              <CashPayment>
                <Card elevation={Elevation.TWO}>
                  <h2>ใส่เงินสดและอีเมล</h2>
                  <FormGroup
                      helperText={getFieldError('cash')}
                      label="ใส่จำนวนเงิน"
                      labelFor="text-input"
                      // labelInfo="(required)"
                      inline
                  >
                    {getFieldDecorator('cash', {
                      validateTrigger: 'onBlur',
                      rules: [{ required: true, message: 'กรุณากรอก' }],
                    })(<NumericInput large/>)}
                  </FormGroup>
                  <FormGroup
                      helperText={getFieldError('email')}
                      label="อีเมล"
                      labelFor="text-input"
                      labelInfo="(เพื่อรับตั๋ว)"
                      inline
                  >
                    {getFieldDecorator('email', {
                      validateTrigger: 'onBlur',
                      rules: [{ required: true, message: 'กรุณากรอก' }, { type: 'email', message: 'กรุณากรอกอีเมลให้ถูกต้อง' }],
                    })(<InputGroup large />)}
                  </FormGroup>
                  <Button onClick={this.onCheckout} large fill>Checkout</Button>
                </Card>
              </CashPayment>
            ): ''}
          </Result>
        </Container>
      </Wrapper>
    )
  }
}

export default createForm()(Home);
