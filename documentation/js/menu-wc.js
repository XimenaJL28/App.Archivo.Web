'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">linea-grafica-upds-angular-prime-ng documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-6864b1301cf074d9d56d528cc0b02fb029d18ce3b652b4c82a2a1deb6d6a02f86049b550924c4386a6a7ab0eecf5a1ec0f2b182dd9cdcbe9e22a09d802bf53af"' : 'data-target="#xs-components-links-module-AppModule-6864b1301cf074d9d56d528cc0b02fb029d18ce3b652b4c82a2a1deb6d6a02f86049b550924c4386a6a7ab0eecf5a1ec0f2b182dd9cdcbe9e22a09d802bf53af"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-6864b1301cf074d9d56d528cc0b02fb029d18ce3b652b4c82a2a1deb6d6a02f86049b550924c4386a6a7ab0eecf5a1ec0f2b182dd9cdcbe9e22a09d802bf53af"' :
                                            'id="xs-components-links-module-AppModule-6864b1301cf074d9d56d528cc0b02fb029d18ce3b652b4c82a2a1deb6d6a02f86049b550924c4386a6a7ab0eecf5a1ec0f2b182dd9cdcbe9e22a09d802bf53af"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RecoveryPasswordComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RecoveryPasswordComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DndModule.html" data-type="entity-link" >DndModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DndModule-3942fd4a152a4055baa3f663c13a41a8d6a0d1bedddcf077d8467292483d8a6a0540f6eb67919eb7e04687d7d09793ae050617a62c9077368b37515705308cb6"' : 'data-target="#xs-components-links-module-DndModule-3942fd4a152a4055baa3f663c13a41a8d6a0d1bedddcf077d8467292483d8a6a0540f6eb67919eb7e04687d7d09793ae050617a62c9077368b37515705308cb6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DndModule-3942fd4a152a4055baa3f663c13a41a8d6a0d1bedddcf077d8467292483d8a6a0540f6eb67919eb7e04687d7d09793ae050617a62c9077368b37515705308cb6"' :
                                            'id="xs-components-links-module-DndModule-3942fd4a152a4055baa3f663c13a41a8d6a0d1bedddcf077d8467292483d8a6a0540f6eb67919eb7e04687d7d09793ae050617a62c9077368b37515705308cb6"' }>
                                            <li class="link">
                                                <a href="components/DndComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DndComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-DndModule-3942fd4a152a4055baa3f663c13a41a8d6a0d1bedddcf077d8467292483d8a6a0540f6eb67919eb7e04687d7d09793ae050617a62c9077368b37515705308cb6"' : 'data-target="#xs-directives-links-module-DndModule-3942fd4a152a4055baa3f663c13a41a8d6a0d1bedddcf077d8467292483d8a6a0540f6eb67919eb7e04687d7d09793ae050617a62c9077368b37515705308cb6"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-DndModule-3942fd4a152a4055baa3f663c13a41a8d6a0d1bedddcf077d8467292483d8a6a0540f6eb67919eb7e04687d7d09793ae050617a62c9077368b37515705308cb6"' :
                                        'id="xs-directives-links-module-DndModule-3942fd4a152a4055baa3f663c13a41a8d6a0d1bedddcf077d8467292483d8a6a0540f6eb67919eb7e04687d7d09793ae050617a62c9077368b37515705308cb6"' }>
                                        <li class="link">
                                            <a href="directives/DndDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DndDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PagesModule.html" data-type="entity-link" >PagesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PagesModule-8b6bb6c075f6bf6ff6d7256c80d1b134d5276af4388fccc04d76526b0f658f609d08e0e963f1d25c60345125555f9ef071f9471783c0f0cf41b349b537fcd6a3"' : 'data-target="#xs-components-links-module-PagesModule-8b6bb6c075f6bf6ff6d7256c80d1b134d5276af4388fccc04d76526b0f658f609d08e0e963f1d25c60345125555f9ef071f9471783c0f0cf41b349b537fcd6a3"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PagesModule-8b6bb6c075f6bf6ff6d7256c80d1b134d5276af4388fccc04d76526b0f658f609d08e0e963f1d25c60345125555f9ef071f9471783c0f0cf41b349b537fcd6a3"' :
                                            'id="xs-components-links-module-PagesModule-8b6bb6c075f6bf6ff6d7256c80d1b134d5276af4388fccc04d76526b0f658f609d08e0e963f1d25c60345125555f9ef071f9471783c0f0cf41b349b537fcd6a3"' }>
                                            <li class="link">
                                                <a href="components/HomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PagesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PagesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SideBarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SideBarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PagesRoutingModule.html" data-type="entity-link" >PagesRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/RePasswordComponent.html" data-type="entity-link" >RePasswordComponent</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AccountService.html" data-type="entity-link" >AccountService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CountryService.html" data-type="entity-link" >CountryService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MainService.html" data-type="entity-link" >MainService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ThemeService.html" data-type="entity-link" >ThemeService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/LoginDTO.html" data-type="entity-link" >LoginDTO</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SedesEstudiante.html" data-type="entity-link" >SedesEstudiante</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserToken.html" data-type="entity-link" >UserToken</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VerificarCredencialesDTO.html" data-type="entity-link" >VerificarCredencialesDTO</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});