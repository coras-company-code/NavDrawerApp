/**
 * @license
 * Copyright (c) 2014, 2021, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your application specific code will go here
 */
define(['knockout', 'ojs/ojcontext', 'ojs/ojcorerouter', 'ojs/ojmodulerouter-adapter', 'ojs/ojknockoutrouteradapter', 'ojs/ojurlparamadapter', 'ojs/ojarraydataprovider', 'ojs/ojoffcanvas', 'ojs/ojknockout', 'ojs/ojmodule-element', 'ojs/ojbutton', 'ojs/ojrouter'],
  function (ko, Context, CoreRouter, ModuleRouterAdapter, KnockoutRouterAdapter, UrlParamAdapter, ArrayDataProvider, OffcanvasUtils) {

    function ControllerViewModel() {
      var self = this;

      //BEFORE commiting tidy version remove this
      oj.Router.defaults['urlAdapter'] = new oj.Router.urlParamAdapter();

      var router2 = oj.Router.rootInstance;

      // Root router configuration
      router2.configure({
        'dashboard': { label: 'Dashboard', isDefault: true },
        'about': { label: 'About' }
      });

      self.router2 = router2;

      //END

      self.navDrawerOn = false;

      var navData = [
        { path: '', redirect: 'dashboard' },
        { path: 'dashboard', detail: { label: 'Dashboard', iconClass: 'oj-ux-ico-bar-chart' } },
        { path: 'about', detail: { label: 'About', iconClass: 'oj-ux-ico-information-s' } }
      ];
      // Router setup
      var router = new CoreRouter(navData, {
        urlAdapter: new UrlParamAdapter()
      });
      router.sync();

      this.moduleAdapter = new ModuleRouterAdapter(router);

      this.selection = new KnockoutRouterAdapter(router);

      // Setup the navDataProvider with the routes, excluding the first redirected
      // route.
      this.navDataProvider = new ArrayDataProvider(navData.slice(1), { keyAttributes: "path" });

      // Drawer setup
      self.toggleDrawer = function () {
        self.navDrawerOn = true;
        return OffcanvasUtils.toggle({ selector: '#navDrawer', modality: 'modal', content: '#pageContent' });
      }

      // Used by modules to get the current page title (and can add adjust padding, but this is in dashboard.js and About.js instead)
      //removed getHeaderModel to dashboard and about

      // Method for adjusting the content area top/bottom paddings to avoid overlap with any fixed regions.
      // This method should be called whenever your fixed region height may change.  The application
      // can also adjust content paddings with css classes if the fixed region height is not changing between
      // views.
      self.adjustContentPadding = function () {
        var topElem = document.getElementsByClassName('oj-applayout-fixed-top')[0];
        var contentElem = document.getElementsByClassName('oj-applayout-content')[0];
        var bottomElem = document.getElementsByClassName('oj-applayout-fixed-bottom')[0];

        if (topElem) {
          contentElem.style.paddingTop = topElem.offsetHeight + 'px';
        }
        if (bottomElem) {
          contentElem.style.paddingBottom = bottomElem.offsetHeight + 'px';
        }
        // Add oj-complete marker class to signal that the content area can be unhidden.
        // See the override.css file to see when the content area is hidden.
        contentElem.classList.add('oj-complete');
      }
    }

    // release the application bootstrap busy state
    Context.getPageContext().getBusyContext().applicationBootstrapComplete();

    return new ControllerViewModel();
  }
);
