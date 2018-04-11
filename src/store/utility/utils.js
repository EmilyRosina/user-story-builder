export default {
  breakpoints: {
    xs: {
      min: 0,
      max: 767
    },
    sm: {
      min: 768,
      max: 991
    },
    md: {
      min: 992,
      max: 1199
    },
    lg: {
      min: 1200,
      max: 1920
    },
    xl: {
      min: 1921,
      max: Infinity
    }

  },
  breakpoint (width) {
    const breakpoints = this.breakpoints
    function withinBreakpoint (breakpointName, width) {
      return width >= breakpoints[breakpointName].min && width <= breakpoints[breakpointName].max
    }
    if (withinBreakpoint('xs', width)) { return 'xs' }
    if (withinBreakpoint('sm', width)) { return 'sm' }
    if (withinBreakpoint('md', width)) { return 'md' }
    if (withinBreakpoint('lg', width)) { return 'lg' }
    if (withinBreakpoint('xl', width)) { return 'xl' }
  }
}
