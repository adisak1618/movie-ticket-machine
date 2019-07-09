import styled from 'styled-components'
// import { Arrow } from 'components/icon'
// import { Base } from './../base'
// import { white, main, black } from './../style/color'

export const Menu = styled.div`
  padding: 0 10px;
  display: inline-block;
`

const Container = styled.div`
  position: relative;
  width: 100%;
  z-index: 3;
    color: #0078FF !important;

`

const ScrollWrapper = styled.div`
  position: relative;
  overflow: hidden;
  display: block;
  width: 100%;
`

const Wrapper = styled.div`
  overflow: hidden;
  border-bottom: 1px solid #DBDBDB !important;
  height: 42px;
  background: #FFF;
`

const Scroll = styled.div`
  overflow: visible;
  position: relative;
  white-space: nowrap !important;
  -webkit-transition: -webkit-transform 0.5s,transform 0.5s !important;
  transition: -webkit-transform 0.5s,transform 0.5s !important;
  -webkit-overflow-scrolling: touch !important;
  height: 60px;
  white-space: nowrap !important;
  overflow-x: auto !important;
  overflow-y: hidden !important;
`

const ScrollExpandItem = styled.div`
  display: inline-block;
  padding: 5px 10px;
  line-height: 2em;
  cursor: pointer;
`

const StickyBar = styled.div`
  width: 100%;
  left: 0px;
  position: fixed;
  top: 0px;
  z-index: 2;
  height: 42px;
  background: #FFF;
  border-bottom: 1px solid #DBDBDB !important;
`
const Gradient = styled.span`
  height: 42px;
  width: 21px;
  display: inline-block;
  background: linear-gradient(to right, rgba(255, 255, 255, 0), #ffffff) !important;
`
const ArrowBase = styled.button`
  z-index: 5;
  font-size: 20px;
  width: 41px;
  padding: 0px;
  height: 42px;
  cursor: pointer !important;
  text-align: center !important;
  line-height: 42px !important;
  position: absolute !important;
  visibility: ${props => (props.hasOwnProperty('visible') && props.visible) ? 'visible': 'hidden'};
  z-index: 999;
  cursor: pointer;
  background: none;
  border: none;
  outline-style: none;
  color: #000;
`
const LeftArrow = styled(ArrowBase)`
  left: 0px;
  transform: rotate(180deg);
`
const RightArrow = styled(ArrowBase)`
  right: 0px;
`
export class MenuWidthScrollExpand extends React.PureComponent {
  static Item({ children, href, onClick, ...otherprops }) {
    const onClickMenu = () => {
      onClick()
      if (href) {
        window.scroll({
          top: (href().offsetTop - 43),
          left: 0,
          behavior: 'smooth',
        });
      }
    }
    return (
      <ScrollExpandItem {...otherprops} onClick={onClickMenu}>
        {children}
      </ScrollExpandItem>
    )
  }

  constructor(props) {
    super(props)
    this.state = {
      active: false,
      offset: 0,
      prev: false,
      next: false,
    }
    this.prevClick = this.prevClick.bind(this)
    this.nextClick = this.nextClick.bind(this)
    // this.scrollChange = this.scrollChange.bind(this)
  }

  // componentDidMount() {
  //   this.scrollChange()
  //   this.input.addEventListener('scroll', this.scrollChange);
  //   window.removeEventListener('resize', this.scrollChange)
  // }

  // componentWillUnmount() {
  //   document.removeEventListener('scroll', this.affixScroll)
  //   window.removeEventListener('resize', this.scrollChange)
  // }

  // scrollChange() {
  //   const visible_next = (this.input.scrollLeft + this.input.offsetWidth < this.input.scrollWidth)
  //   const visible_prev = (this.input.scrollLeft > 40)
  //   this.setState({
  //     next: visible_next,
  //     prev: visible_prev,
  //   })
  // }

  prevClick() {
    this.input.scrollTo(this.input.scrollLeft - 50, 0);
    // if (this.input.scrollLeft > 0) {
    //   this.input.scrollTo(this.input.scrollLeft - 50, 0);
    // }
  }

  nextClick() {
    this.input.scrollTo(this.input.scrollLeft + 50, 0);
    // if (this.input.scrollLeft < (this.input.scrollWidth - window.innerWidth)) {
    //   this.input.scrollTo(this.input.scrollLeft + 50, 0);
    // }
  }

  render() {
    const { children } = this.props
    const { offset, prev, next } = this.state
    return (
      <div>
        <Container>
          <ScrollWrapper>
            <Wrapper>
              <LeftArrow visible={prev} onClick={this.prevClick}>
                <Gradient />
                {/* <Arrow background={white} /> */}
              </LeftArrow>
              <RightArrow visible={next} onClick={this.nextClick}>
                <Gradient />
                {/* <Arrow background={white} /> */}
              </RightArrow>
              <Scroll innerRef={el => this.input = el} >
                {children}
              </Scroll>
            </Wrapper>
          </ScrollWrapper>
        </Container>
        { this.state.active ? <StickyBar /> : ''}
      </div>
    )
  }
}
