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
define(['knockout', 'ojs/ojcontext', 'ojs/ojcorerouter', 'ojs/ojmodulerouter-adapter', 'ojs/ojknockoutrouteradapter', 'ojs/ojurlparamadapter', 'ojs/ojarraydataprovider', 'ojs/ojoffcanvas', 'ojs/ojknockout', 'ojs/ojmodule-element', 'ojs/ojbutton', 'ojs/ojrouter', 'ojs/ojmoduleanimations', 'ojs/ojmodule-element-utils'],
  function (ko, Context, CoreRouter, ModuleRouterAdapter, KnockoutRouterAdapter, UrlParamAdapter, ArrayDataProvider, OffcanvasUtils, ModuleElementUtils) {

    function ControllerViewModel() {
      var self = this;

      //New: routerTWO to replace router once it works
      self.routerTWO = oj.Router.rootInstance;

      self.routerTWO.configure({
        'home': { label: 'Home', isDefault: true },
        'dashboard': { label: 'Dashboard' }
      });

      oj.Router.defaults['urlAdapter'] = new oj.Router.urlParamAdapter();

      //**Module Config - HELP NEEDED**
      self.moduleConfig = null
      //this results in the error:
      //Uncaught (in promise) TypeError: Unable to process binding "ojModule: function(){return {"view":config().view,"viewModel":config().viewModel,"cleanupMode":config().cleanupMode,"animation":animation} }"

      //tried this with documentation 
      // self.moduleConfig = ModuleElementUtils.createConfig({ name: 'dashboard' });

      //Another suggestion from internet:
      // self.pendingAnimationType = null;

      // function switcherCallback(context) {
      //   return self.pendingAnimationType;
      // }

      // function mergeConfig(original) {
      //   return $.extend(true, {}, original, {
      //     'animation': oj.ModuleAnimations.switcher(switcherCallback)
      //   });
      // }
      // mergeConfig(self.routerTWO.moduleConfig);

      //END of new

      self.navDrawerOn = false;

      //This will be replaced when above works
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
      //end of what will be replaced

      // Drawer setup
      self.toggleDrawer = function () {
        self.navDrawerOn = true;
        return OffcanvasUtils.toggle({ selector: '#navDrawer', modality: 'modal', content: '#pageContent' });
      }

      // Used by modules to get the current page title (and can add adjust padding, but this is in dashboard.js and About.js instead)
      self.getHeaderModel = function () { // Return an object containing the current page title // and callback handlers
        return {
          pageTitle: self.selection.state().detail.label,
          startBtn: {
            click: self.toggleDrawer,
            icons: 'oj-fwk-icon oj-fwk-icon-hamburger',
            visible: true
          },
        };
      };

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
