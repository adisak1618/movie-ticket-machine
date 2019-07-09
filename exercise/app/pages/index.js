import React, { PureComponent } from 'react';
import { Button, Card, Elevation, Icon } from "@blueprintjs/core";
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

const SearchBox = styled.div`
  padding: 10px;
  // background: #ccc;
`;

const Result = styled.div`
  padding: 10px;
  margin-bottom: 50px;
  .moviecard {
    text-align: left;
    width: 100%;
    padding: 0px;
    margin: 10px 0;
    box-sizing: border-box;
    position: relative;
    h3 {
      margin: 0px;
      margin-bottom: 10px;
      font-size: 1.6em;
    }
    // span {
    //   background: #e51c23;
    //   color: #FFF;
    //   text-align: center;
    //   width: 70px;
    //   position: absolute;
    //   right: -10px;
    //   padding: 3px;
    //   border-radius: 3px;
    // }
    // .label1 {
    //   background: #5677Fc;
    // }
    .detail {
      height: 100%;
      padding: 10px;
      ${Row} {
        flex-direction: column;
        height: 100%;
      }
    }
    .showtimes {
      span.time {
        display: inline-block;
        background: #ffa500;
        margin: 5px 10px;
        padding: 4px 8px;
        border-radius: 5px;
      }
    }
  }
`;

class Home extends PureComponent {

  onSearch () {
    alert('hi');
  }

  render () {
    return(
      <Wrapper>
        <Container>
          {/* <h1>Blue-OD</h1>
          <p>We make old movies alive</p> */}
          <nav class="bp3-navbar .modifier">
            <div class="bp3-navbar-group bp3-align-left">
              <div class="bp3-navbar-heading">Blueprint</div>
              <div class="bp3-navbar-divider" />
              <div>We make old movies alive</div>
              {/* <input class="bp3-input" placeholder="Search files..." type="text" /> */}
              {/* <div class="bp3-input-group bp3-fill">
                <span class="bp3-icon bp3-icon-search"></span>
                <input onChange={this.onSearch} type="text" class="bp3-input" placeholder="Search" />
                <button class="bp3-button bp3-minimal bp3-intent-primary bp3-icon-arrow-right"></button>
              </div> */}
            </div>
            <div class="bp3-navbar-group bp3-align-right">
              {/* <button class="bp3-button bp3-minimal bp3-icon-home">Home</button>
              <button class="bp3-button bp3-minimal bp3-icon-document">Files</button>
              <span class="bp3-navbar-divider"></span>
              <button class="bp3-button bp3-minimal bp3-icon-user"></button>
              <button class="bp3-button bp3-minimal bp3-icon-notifications"></button>
              <button class="bp3-button bp3-minimal bp3-icon-cog"></button> */}
              <div class="bp3-input-group bp3-fill">
                <span class="bp3-icon bp3-icon-search"></span>
                <input onChange={this.onSearch} type="text" class="bp3-input" placeholder="Search" />
                <button class="bp3-button bp3-minimal bp3-intent-primary bp3-icon-arrow-right"></button>
              </div>
            </div>
          </nav>
          <MenuWidthScrollExpand>
            <MenuItem>NOW SHOWING</MenuItem>
            <MenuItem>ADVANCE TICKET</MenuItem>
            <MenuItem>COMING SOON</MenuItem>
            <MenuItem>IMAX</MenuItem>
            <MenuItem>4DX</MenuItem>
          </MenuWidthScrollExpand>
          {/* <Button intent="success" text="button content" /> */}
          {/* <SearchBox>
            <div class="bp3-input-group bp3-large bp3-fill">
              <span class="bp3-icon bp3-icon-search"></span>
              <input onChange={this.onSearch} type="text" class="bp3-input" placeholder="Search" />
              <button class="bp3-button bp3-minimal bp3-intent-primary bp3-icon-arrow-right"></button>
            </div>
          </SearchBox> */}
          <Result>
            {
              [0,1,2,3,4,5].map(item => 
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
                          </Column>
                          <Column>
                            <div className="showtimes">
                              <span className="time">
                                10:00
                              </span>
                              <span className="time">
                                12:00
                              </span>
                              <span className="time">
                                14:00
                              </span>
                              <span className="time">
                                15:30
                              </span>
                              <span className="time">
                                17:00
                              </span>
                              <span className="time">
                                19:00
                              </span>
                              <span className="time">
                                20:30
                              </span>
                              <span className="time">
                                22:00
                              </span>
                              <span className="time">
                                23:00
                              </span>
                            </div>
                          </Column>
                        </Row>
                      </div>
                    </Column>
                  </Row>
                </Card>
              )
            }
          </Result>
        </Container>
      </Wrapper>
    )
  }
}

export default Home;
