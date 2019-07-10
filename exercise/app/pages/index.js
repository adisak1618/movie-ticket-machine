import React, { PureComponent } from 'react';
import { Button, Card, Elevation, Icon, Tab, Tabs } from "@blueprintjs/core";
import Request from 'helper/request';
import Link from 'next/link';
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
  .bp3-tab {
    outline: none;
  }
  .bp3-tab-list {
    background: #FFF;
    padding: 0 20px;
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
      > ${Row} {
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
        cursor: pointer;
        &:hover {
          background: #fff;
          color: #000;
        }
      }
    }
    .price {
      border: 1px solid #ccc;
      width: 110px;
      padding: 10px;
      border-radius: 10px;
      span {
        display: inline-block;
      }
      ${Column}:first-child {
        font-size: 1.5em;
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

class Home extends PureComponent {
  static async getInitialProps() {
    const movies = await Request('/movies?type=now');
    return {
      data: movies.data
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      tab: 'now',
      movies: null,
      loading: false,
    };
    this.handleTabChange = this.handleTabChange.bind(this);
    this.fetchMovies = this.fetchMovies.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  handleTabChange(tab) {
    this.setState({ tab });
    this.fetchMovies(tab);
  }

  async fetchMovies(type, title = '') {
    this.setState({ loading: true });
    const movies = await Request(`/movies?type=${type}&title=${title}`);
    await this.timeout(300);
    this.setState({ movies: movies.data, loading: false });
  }

  async onSearch(e) {
    const txt = e.target.value;
    const { tab } = this.state;
    if(txt.length > 2 || txt.length === 0) this.fetchMovies(tab, txt); // start search when txt have at least 3
  }

  timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  render () {
    const { data } = this.props;
    const { tab, movies, loading } = this.state;
    return(
      <Wrapper>
        <Container>
          <nav class="bp3-navbar .modifier">
            <div class="bp3-navbar-group bp3-align-left">
              <div class="bp3-navbar-heading">Blueprint</div>
              <div class="bp3-navbar-divider" />
              <div>We make old movies alive</div>
            </div>
            <div class="bp3-navbar-group bp3-align-right">
              <div class="bp3-input-group bp3-fill">
                <span class="bp3-icon bp3-icon-search"></span>
                <input onChange={this.onSearch} type="text" class="bp3-input" placeholder="Search" />
                <button class="bp3-button bp3-minimal bp3-intent-primary bp3-icon-arrow-right"></button>
              </div>
            </div>
          </nav>
          <Tabs large id="TabsExample" onChange={this.handleTabChange} selectedTabId={tab}>
            <Tab id="now" title="NOW SHOWING" />
            <Tab id="adt" title="ADVANCE TICKET"  />
            <Tab id="cs" title="COMING SOON" />
            {/* <Tabs.Expander /> */}
          </Tabs>
          <Result>
            {
              (movies || data).map(({ _id, title, poster, price }) => 
                <Card className="moviecard bp3-dark" elevation={Elevation.TWO}>
                  <Row>
                    <Column>
                      <Poster src={`/images/poster/${poster}`} className={loading ? 'bp3-skeleton': ''} />
                    </Column>
                    <Column fill>
                      <div className="detail">
                        <Row space-between>
                          <Column>
                            <Row space-between>
                              <Column>
                                <h3 className={loading ? 'bp3-skeleton': ''}>{title}</h3>
                                <label className={loading ? 'bp3-skeleton': ''}>Theatre 1 <Icon icon="volume-down" iconSize={18} /> Eng</label>
                              </Column>
                              <Column>
                                <div className={loading ? 'price bp3-skeleton': 'price'}>
                                  <Row space-between alignItem="center">
                                    <Column>{price}</Column>
                                    <Column>BATH /<br/>SEAT</Column>
                                  </Row>
                                </div>
                              </Column>
                            </Row>
                          </Column>
                          <Column>
                            <div className={loading ? 'bp3-skeleton showtimes': 'showtimes'}>
                              {
                                [
                                  '10:30',
                                  '12:00',
                                  '12:30',
                                  '14:00',
                                  '14:30',
                                  '16:00',
                                  '16:30',
                                  '18:30',
                                  '20:00',
                                  '20:30',
                                  '22:00',
                                ].map(time => (
                                  <Link href={`/movie/${_id}?time=${time}`}>
                                    <span className="time">
                                      {time}
                                    </span>
                                  </Link>
                                ))
                              }
                            </div>
                          </Column>
                        </Row>
                      </div>
                    </Column>
                  </Row>
                </Card>
              )
            }
            {
              (movies && movies.length === 0) ? (
                <Card  className="bp3-dark">
                  <div class="bp3-non-ideal-state">
                    <div class="bp3-non-ideal-state-visual">
                      <span class="bp3-icon bp3-icon-folder-open"></span>
                    </div>
                    <h4 class="bp3-heading">We found nothing</h4>
                    <div>try agian with different word</div>
                  </div>
                </Card>
              ): ''
            }
          </Result>
        </Container>
      </Wrapper>
    )
  }
}

export default Home;
