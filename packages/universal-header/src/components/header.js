import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled, { css, keyframes } from 'styled-components'
import CSSTransition from 'react-transition-group/CSSTransition'
// context
import HeaderContext, { HamburgerContext } from '../contexts/header-context'
// utils
import { getLogoLink, checkReferrer } from '../utils/links'
import { selectLogoType, selectHeaderTheme } from '../utils/theme'
// constants
import themeConst from '../constants/theme'
import { MENU_WIDTH } from '../constants/hamburger-menu'
// components
import Channel from './channels'
import { DesktopHeaderAction, MobileHeaderAction } from './action-button'
import Icons, { MobileIcons } from './icons'
import Slogan from './slogan'
import HamburgerMenu from './hamburger-menu'
import TabBar from './tab-bar'
// @twreporter
import Link from '@twreporter/react-components/lib/customized-link'
import mq from '@twreporter/core/lib/utils/media-query'
import Divider from '@twreporter/react-components/lib/divider'
import { LogoHeader } from '@twreporter/react-components/lib/logo'
import { IconButton } from '@twreporter/react-components/lib/button'
import { Hamburger, Arrow } from '@twreporter/react-components/lib/icon'
import { useOutsideClick } from '@twreporter/react-components/lib/hook'
import {
  DesktopAndAbove,
  TabletAndBelow,
} from '@twreporter/react-components/lib/rwd'
import EntityPath from '@twreporter/core/lib/constants/entity-path'
// lodash
import some from 'lodash/some'
import includes from 'lodash/includes'
import throttle from 'lodash/throttle'
const _ = {
  some,
  includes,
  throttle,
}

const narrowHeaderHeight = 65
const channelHeight = 50
const animation = {
  step1Duration: '200ms',
  step2Delay: '150ms',
  step2Duration: '50ms',
  step3Delay: '150ms',
  step3Duration: '200ms',
}
const zIndex = {
  tabBarMobile: 10,
  tabBarTablet: 3,
  hamburger: 4,
  header: 3,
  topRow: 2,
  channel: 1,
}

const channelSlideIn = keyframes`
  from {
    transform: translateY(${-channelHeight}px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`
const channelSlideOut = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(${-channelHeight}px);
  }
`
const ChannelEffect = css`
  .channel-effect-enter {
    opacity: 0;
  }
  .channel-effect-enter-active {
    animation: ${channelSlideIn} ${animation.step1Duration} linear;
    animation-delay: 150ms;
  }
  .channel-effect-exit-active {
    animation: ${channelSlideOut} ${animation.step1Duration} linear;
    animation-delay: 0ms;
  }
`
const HeaderContainer = styled.div`
  position: ${(props) =>
    props.$theme === themeConst.transparent ? 'fixed' : 'sticky'};
  top: 0;
  width: 100%;
  background-color: ${(props) => props.$bgColor};
  transform: translateY(
    ${(props) => (props.$hideHeader ? `${-narrowHeaderHeight}px` : '0')}
  );
  transition: transform 300ms
    ${(props) => (props.$hideHeader ? 'ease-in' : 'ease-out')};
  ${mq.mobileOnly`
    ${(props) => (props.$forceShowOnMobile ? 'transform: translateY(0);' : '')}
  `}
`
const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  z-index: ${zIndex.header};

  ${mq.hdOnly`
    width: 1280px;
  `}
  ${mq.desktopOnly`
    padding: 0 48px;
  `}
  ${mq.tabletOnly`
    padding: 0 32px;
  `}
  ${mq.mobileOnly`
    padding: 0 24px;
  `}
`
const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 16px;
  a {
    display: flex;
  }
`
const MobileLogoContainer = styled.div`
  display: flex;
  align-items: center;
  img {
    height: 21px;
  }
  a {
    display: flex;
  }
`
const HideWhenNarrow = styled.div``
const ShowWhenNarrow = styled.div``
const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${(props) => (props.$toUseNarrow ? '16px' : '24px')} 16px;
  z-index: ${zIndex.topRow};
  background-color: ${(props) => props.$topRowBgColor};
  ${ShowWhenNarrow} {
    opacity: ${(props) => (props.$toUseNarrow ? '1' : '0')};
    transition: opacity ${animation.step3Duration};
    transition-delay: ${(props) => (props.$toUseNarrow ? '350ms' : 0)};
  }
  ${HideWhenNarrow} {
    opacity: ${(props) => (props.$toUseNarrow ? '0' : '1')};
    transition: opacity ${animation.step3Duration};
    transition-delay: ${(props) =>
      props.$toUseNarrow ? animation.step3Delay : 0};
    pointer-events: ${(props) => (props.$toUseNarrow ? 'none' : 'all')};
  }
  ${LogoContainer} {
    margin-left: ${(props) => (props.$toUseNarrow ? '24px' : '0')};
    transform: translateX(${(props) => (props.$toUseNarrow ? '0' : '-24px')});
    transition: all ${animation.step3Duration};
    transition-delay: ${(props) =>
      props.$toUseNarrow ? animation.step3Delay : 0};
    img,
    a {
      height: ${(props) => (props.$toUseNarrow ? '24px' : '32px')};
      transition: height ${animation.step3Duration};
      transition-delay: ${(props) =>
        props.$toUseNarrow ? animation.step3Delay : 0};
    }
  }
  ${mq.tabletAndBelow`
    padding: 16px 0;
  `}
`
const StyledDivider = styled(Divider)`
  opacity: ${(props) => (props.$toUseNarrow ? '0' : '1')};
  transition: opacity ${animation.step2Duration};
  transition-delay: ${(props) =>
    props.$toUseNarrow ? animation.step2Delay : 0};
`
const IconContainer = styled.div`
  margin-left: 24px;
  ${mq.mobileOnly`
    margin-left: 16px;
  `}
`
const FlexGroup = styled.div`
  display: flex;
  align-items: center;
`
const ChannelContainer = styled.div`
  z-index: ${zIndex.channel};
  ${ChannelEffect}
`
const HamburgerContainer = styled.div`
  z-index: ${zIndex.hamburger};
  position: absolute;
  top: 0;
  left: -${MENU_WIDTH.desktop};
  transition: transform 300ms ease-in-out;
  transform: translateX(
    ${(props) => (props.$showHamburger ? MENU_WIDTH.desktop : 0)}
  );
  ${mq.tabletOnly`
    left: -${MENU_WIDTH.tablet};
    transform: translateX(${(props) =>
      props.$showHamburger ? MENU_WIDTH.tablet : 0});
  `}
  ${mq.mobileOnly`
    left: 0;
    transform: none;
    opacity: ${(props) => (props.$showHamburger ? 1 : 0)};
  `}
`
const TabBarContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  ${mq.tabletOnly`
    z-index: ${zIndex.tabBarTablet};
  `}
  ${mq.mobileOnly`
    z-index: ${zIndex.tabBarMobile};
  `}
`
const HideOnArticle = styled.div`
  ${(props) => (props.$isOnArticlePage ? 'display: none;' : '')}
`
const PrevButton = styled.div`
  ${(props) => (props.$isShow ? '' : 'display: none;')}
  margin-right: 8px;
  padding: 4px;
  transform: translateX(-8px);
`

const Header = ({ hamburgerContext = {} }) => {
  const {
    releaseBranch,
    isLinkExternal,
    theme,
    toUseNarrow,
    hideHeader,
    pathname,
    referrerPath,
  } = useContext(HeaderContext)
  const [defaultShowHamburger, setDefaultShowHamburger] = useState(false)
  let showHamburger = hamburgerContext?.showHamburger || defaultShowHamburger
  let setShowHamburger =
    hamburgerContext?.setShowHamburger || setDefaultShowHamburger

  const logoLink = getLogoLink(isLinkExternal, releaseBranch)
  const logoType = selectLogoType(theme)
  const HamburgerIcon = <Hamburger releaseBranch={releaseBranch} />
  const { bgColor, topRowBgColor } = selectHeaderTheme(theme)
  const toggleHamburger = (e) => {
    e.stopPropagation()
    setShowHamburger(!showHamburger)
  }
  const closeHamburger = () => setShowHamburger(false)
  const ref = useOutsideClick(closeHamburger)
  const contextValue = {
    toggleHamburger,
    closeHamburgerMenu: closeHamburger,
    isHamburgerMenuOpen: showHamburger,
  }
  useEffect(() => {
    closeHamburger()
  }, [pathname])

  const isOnArticlePage = _.includes(pathname, EntityPath.article)
  const needPrevIconRoute = [
    `${EntityPath.account}/donation-history`,
    `${EntityPath.account}/email-subscription`,
    `${EntityPath.myReading}/saved`,
    `${EntityPath.myReading}/history`,
  ]
  const isOnNeedPrevIconPage = _.some(needPrevIconRoute, (el) =>
    _.includes(pathname, el)
  )
  const [currentClientWidth, setCurrentClientWidth] = useState(0)
  useEffect(() => {
    const handleResize = _.throttle(() => {
      setCurrentClientWidth(document.body.clientWidth)
    })

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  const showPrevIcon =
    isOnArticlePage || (isOnNeedPrevIconPage && currentClientWidth < 768) // only show it on mobile
  const BackToPrevIcon = (
    <Arrow direction="left" releaseBranch={releaseBranch} />
  )
  const gotoPrev = () => {
    if (referrerPath || checkReferrer(document.referrer, releaseBranch)) {
      // go to previous page when referer is twreporter site
      window.history.back()
    } else {
      // go to home page when referer is not twreporter site
      window.location.href = '/'
    }
  }
  const DesktopHeaderJSX = (
    <HeaderSection>
      <TopRow $toUseNarrow={toUseNarrow} $topRowBgColor={topRowBgColor}>
        <FlexGroup>
          <ShowWhenNarrow>
            <IconButton
              iconComponent={HamburgerIcon}
              theme={theme}
              onClick={toggleHamburger}
            />
          </ShowWhenNarrow>
          <LogoContainer>
            <Link {...logoLink}>
              <LogoHeader type={logoType} releaseBranch={releaseBranch} />
            </Link>
          </LogoContainer>
          <HideWhenNarrow>
            <Slogan />
          </HideWhenNarrow>
        </FlexGroup>
        <FlexGroup>
          <HideWhenNarrow>
            <DesktopHeaderAction />
          </HideWhenNarrow>
          <IconContainer>
            <Icons />
          </IconContainer>
        </FlexGroup>
      </TopRow>
      <StyledDivider $toUseNarrow={toUseNarrow} />
      <ChannelContainer>
        <CSSTransition
          in={!toUseNarrow}
          classNames="channel-effect"
          timeout={{ appear: 0, enter: 350, exit: 200 }}
          unmountOnExit
        >
          <Channel onClickHambuger={toggleHamburger} />
        </CSSTransition>
      </ChannelContainer>
    </HeaderSection>
  )
  const MobileHeaderJSX = (
    <HeaderSection>
      <TopRow $toUseNarrow={toUseNarrow} $topRowBgColor={topRowBgColor}>
        <FlexGroup>
          <PrevButton $isShow={showPrevIcon} onClick={gotoPrev}>
            <IconButton iconComponent={BackToPrevIcon} theme={theme} />
          </PrevButton>
          <MobileLogoContainer>
            <Link {...logoLink}>
              <LogoHeader type={logoType} releaseBranch={releaseBranch} />
            </Link>
          </MobileLogoContainer>
        </FlexGroup>
        <FlexGroup>
          <MobileHeaderAction />
          <IconContainer>
            <MobileIcons />
          </IconContainer>
        </FlexGroup>
      </TopRow>
    </HeaderSection>
  )

  return (
    <HamburgerContext.Provider value={contextValue}>
      <HeaderContainer
        $bgColor={bgColor}
        $hideHeader={hideHeader}
        $forceShowOnMobile={showHamburger}
        $theme={theme}
      >
        <DesktopAndAbove>{DesktopHeaderJSX}</DesktopAndAbove>
        <TabletAndBelow>{MobileHeaderJSX}</TabletAndBelow>
      </HeaderContainer>
      <HamburgerContainer ref={ref} $showHamburger={showHamburger}>
        <CSSTransition
          in={showHamburger}
          classNames="hamburger-effect"
          timeout={{ appear: 0, enter: 300, exit: 300 }}
          unmountOnExit
        >
          <HamburgerMenu />
        </CSSTransition>
      </HamburgerContainer>
      <TabletAndBelow>
        <HideOnArticle $isOnArticlePage={isOnArticlePage}>
          <TabBarContainer>
            <TabBar toggleHamburger={toggleHamburger} />
          </TabBarContainer>
        </HideOnArticle>
      </TabletAndBelow>
    </HamburgerContext.Provider>
  )
}
Header.propTypes = {
  hamburgerContext: PropTypes.object,
}

export default Header
