webpackJsonp([3],{

/***/ 101:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AssetsEditPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_rest_rest__ = __webpack_require__(78);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the AssetsEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AssetsEditPage = (function () {
    function AssetsEditPage(navCtrl, navParams, restProvider, toastCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.restProvider = restProvider;
        this.toastCtrl = toastCtrl;
        this.restProvider.getSelectableCoinList()
            .then(function (data) {
            _this.selectableCoinList = data;
        });
        this.restProvider.getAssets()
            .then(function (data) {
            _this.userAssetsList = data;
        });
    }
    AssetsEditPage.prototype.getInputCoinName = function () {
        var _this = this;
        var timeoutMS = 400;
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(function () {
            // timeoutMS秒間の入力待機後、画面に描画される
            _this.filteringCoinList(_this.selectedCoinName.toLowerCase());
            _this.isInput = _this.selectedCoinName != "";
        }, timeoutMS);
    };
    AssetsEditPage.prototype.addCoin = function (id) {
        var _this = this;
        this.selectedCoinName = '';
        this.isInput = this.selectedCoinName != '';
        this.restProvider.postAsset(id, 0)
            .then(function () {
            _this.restProvider.getAssets()
                .then(function (data) {
                _this.userAssetsList = data;
            });
        })
            .catch(function (err) {
            // TODO: 通信エラーとToastの中身を振り分ける
            var toast = _this.toastCtrl.create({
                message: "既にこのコインは登録されています",
                duration: 3000
            });
            toast.present();
        });
    };
    AssetsEditPage.prototype.deleteCoinAsset = function (id) {
        var _this = this;
        this.restProvider.deleteAsset(id)
            .then(function () {
            var toast = _this.toastCtrl.create({
                message: "削除が完了しました。",
                duration: 3000
            });
            toast.present();
        })
            .catch(function () {
            var toast = _this.toastCtrl.create({
                message: "削除に失敗しました",
                duration: 3000,
            });
            toast.present();
        })
            .then(function () {
            _this.restProvider.getAssets()
                .then(function (data) {
                _this.userAssetsList = data;
            });
        });
    };
    AssetsEditPage.prototype.editAmount = function (id, amount) {
        var _this = this;
        var timeoutMS = 1000;
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(function () {
            // timeoutMS秒間の入力待機後、編集をAPIに投稿される
            // APIに投稿する
            _this.restProvider.putAsset(id, amount)
                .then(function () {
                var toast = _this.toastCtrl.create({
                    message: "保存完了しました",
                    duration: 2000
                });
                toast.present();
            })
                .catch(function () {
                var toast = _this.toastCtrl.create({
                    message: "保存に失敗しました。通信環境をご確認ください",
                    duration: 2000
                });
                toast.present();
            });
        }, timeoutMS);
    };
    AssetsEditPage.prototype.filteringCoinList = function (input) {
        var rawCoinList = this.selectableCoinList;
        this.matchedCoinList = rawCoinList.filter(function (element) {
            return element.id.toLowerCase().indexOf(input) > -1 ||
                element.name.toLowerCase().indexOf(input) > -1 ||
                element.symbol.toLowerCase().indexOf(input) > -1;
        });
        this.isNotFound = this.matchedCoinList.length <= 0;
    };
    AssetsEditPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-assets-edit',template:/*ion-inline-start:"/Users/ahaha0807/Documents/Programings/product/CryptocurrencyClient/src/pages/assets-edit/assets-edit.html"*/'<!--\n  Generated template for the AssetsEditPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>コイン管理</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <ion-card>\n        <ion-card-header>\n            コイン銘柄追加\n        </ion-card-header>\n        <ion-card-content>\n            <ion-item>\n                <ion-label color="primary">\n                    <ion-icon name="search"></ion-icon>\n                </ion-label>\n                <ion-input placeholder="例）Bitcoin, BTC, bitcoin"\n                           (input)="getInputCoinName()"\n                           id="assets-edit-coin-add-form"\n                           [(ngModel)]="selectedCoinName"></ion-input>\n            </ion-item>\n\n            <ion-list inset *ngIf="isInput">\n                <button ion-item *ngFor="let coin of matchedCoinList" (click)="addCoin(coin.id)">\n                    {{coin.name}}（{{coin.symbol}}）\n                </button>\n            </ion-list>\n\n            <ion-item *ngIf="isNotFound" text-wrap>\n                一致するコインが存在しません。\n                選択できないコインの可能性があります。詳しくは<a href="">こちら</a>\n            </ion-item>\n        </ion-card-content>\n    </ion-card>\n\n    <ion-card>\n        <ion-card-content>\n            <ion-list inset>\n                <li ion-item *ngFor="let asset of userAssetsList">\n                    <ion-label>{{asset.id}}</ion-label>\n                    <ion-input item-right [(ngModel)]="asset.amount"\n                               (input)="editAmount(asset.id, asset.amount)"></ion-input>\n                    <ion-icon name="trash" item-end color="danger" (click)="deleteCoinAsset(asset.id)"></ion-icon>\n                </li>\n            </ion-list>\n        </ion-card-content>\n    </ion-card>\n</ion-content>\n'/*ion-inline-end:"/Users/ahaha0807/Documents/Programings/product/CryptocurrencyClient/src/pages/assets-edit/assets-edit.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_rest_rest__["a" /* RestProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ToastController */]])
    ], AssetsEditPage);
    return AssetsEditPage;
}());

//# sourceMappingURL=assets-edit.js.map

/***/ }),

/***/ 102:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AssetsViewPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__assets_edit_assets_edit__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_rest_rest__ = __webpack_require__(78);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the AssetsViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AssetsViewPage = (function () {
    function AssetsViewPage(navCtrl, navParams, restProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.restProvider = restProvider;
        this.isNetworkError = false;
    }
    AssetsViewPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.restProvider.getAssets()
            .then(function (data) {
            _this.information = data;
        })
            .then(function () {
            _this.information = _this.information.map(function (element) {
                var temp = element.amount * element.price_jpy * 100;
                element.jpy = Math.round(temp) / 100;
                return element;
            });
            _this.total = 0;
            _this.information.forEach(function (element) {
                _this.total += element.jpy;
            });
            _this.total = Math.round(_this.total);
            _this.viewMode = 'jpy';
        })
            .catch(function (err) {
            _this.isNetworkError = true;
        });
    };
    AssetsViewPage.prototype.addComma = function (value) {
        return String(value).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    };
    AssetsViewPage.prototype.goAssetsEditPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__assets_edit_assets_edit__["a" /* AssetsEditPage */]);
    };
    AssetsViewPage.prototype.switchAssets = function () {
        this.viewMode == 'jpy' ? this.viewMode = 'coin' : this.viewMode = 'jpy';
    };
    AssetsViewPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-assets-view',template:/*ion-inline-start:"/Users/ahaha0807/Documents/Programings/product/CryptocurrencyClient/src/pages/assets-view/assets-view.html"*/'<!--\n  Generated template for the AssetsViewPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>総資産</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <ion-card color="primary" *ngIf="!isNetworkError">\n        <ion-card-header text-center>\n            総資産額\n        </ion-card-header>\n        <ion-card-content text-center class="assets-view-total-card-value">\n            {{addComma(total)}} JPY\n        </ion-card-content>\n    </ion-card>\n\n    <ion-card color="danger" *ngIf="isNetworkError">\n        <ion-card-header text-center>\n            ネットワークに接続できませんでした\n        </ion-card-header>\n    </ion-card>\n\n    <ion-card (click)="switchAssets()">\n        <ion-list inset *ngIf="viewMode == \'jpy\'">\n            <li ion-item *ngFor="let item of information">\n                <span item-start>\n                    {{item.id}}\n                </span>\n                <span item-end>\n                    {{addComma(item.jpy)}} JPY\n                </span>\n            </li>\n        </ion-list>\n        <ion-list inset *ngIf="viewMode == \'coin\'">\n            <li ion-item *ngFor="let item of information">\n                <span item-start>\n                    {{item.id}}\n                </span>\n                <span item-end>\n                    {{item.amount}} 枚\n                </span>\n            </li>\n        </ion-list>\n    </ion-card>\n\n    <ion-fab bottom right *ngIf="!isNetworkError">\n        <button ion-fab color="secondary" (click)="goAssetsEditPage()">\n            <ion-icon name="settings"></ion-icon>\n        </button>\n    </ion-fab>\n</ion-content>\n'/*ion-inline-end:"/Users/ahaha0807/Documents/Programings/product/CryptocurrencyClient/src/pages/assets-view/assets-view.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__providers_rest_rest__["a" /* RestProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_rest_rest__["a" /* RestProvider */]) === "function" && _c || Object])
    ], AssetsViewPage);
    return AssetsViewPage;
    var _a, _b, _c;
}());

//# sourceMappingURL=assets-view.js.map

/***/ }),

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotSingedHomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the NotSingedHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var NotSingedHomePage = (function () {
    function NotSingedHomePage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    NotSingedHomePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad NotSingedHomePage');
    };
    NotSingedHomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-not-singed-home',template:/*ion-inline-start:"/Users/ahaha0807/Documents/Programings/product/CryptocurrencyClient/src/pages/not-singed-home/not-singed-home.html"*/'<!--\n  Generated template for the NotSingedHomePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n    <ion-navbar hideBackButton>\n        <ion-title>\n            <div class="not-signed-in-home__header-image-wrapper">\n                <img src="../../assets/imgs/side-logo.png" alt="LOGO">\n            </div>\n        </ion-title>\n    </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"/Users/ahaha0807/Documents/Programings/product/CryptocurrencyClient/src/pages/not-singed-home/not-singed-home.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
    ], NotSingedHomePage);
    return NotSingedHomePage;
}());

//# sourceMappingURL=not-singed-home.js.map

/***/ }),

/***/ 115:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 115;

/***/ }),

/***/ 157:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/assets-edit/assets-edit.module": [
		286,
		2
	],
	"../pages/assets-view/assets-view.module": [
		287,
		1
	],
	"../pages/not-singed-home/not-singed-home.module": [
		288,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 157;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 202:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__not_singed_home_not_singed_home__ = __webpack_require__(103);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HomePage = (function () {
    function HomePage(navCtrl, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.storage.set('isLogin', true);
        this.storage.get('isLogin').then(function (data) {
            if (!data) {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__not_singed_home_not_singed_home__["a" /* NotSingedHomePage */]);
            }
        });
    }
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/ahaha0807/Documents/Programings/product/CryptocurrencyClient/src/pages/home/home.html"*/'<ion-header>\n    <ion-navbar>\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>\n            <div class="home__header-image-wrapper">\n                <img src="../../assets/imgs/side-logo.png" alt="LOGO">\n            </div>\n        </ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"/Users/ahaha0807/Documents/Programings/product/CryptocurrencyClient/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 204:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ListPage = (function () {
    function ListPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');
        // Let's populate this page with some filler content for funzies
        this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
            'american-football', 'boat', 'bluetooth', 'build'];
        this.items = [];
        for (var i = 1; i < 11; i++) {
            this.items.push({
                title: 'Item ' + i,
                note: 'This is item #' + i,
                icon: this.icons[Math.floor(Math.random() * this.icons.length)]
            });
        }
    }
    ListPage_1 = ListPage;
    ListPage.prototype.itemTapped = function (event, item) {
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(ListPage_1, {
            item: item
        });
    };
    ListPage = ListPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-list',template:/*ion-inline-start:"/Users/ahaha0807/Documents/Programings/product/CryptocurrencyClient/src/pages/list/list.html"*/'<ion-header>\n    <ion-navbar>\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>List</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <ion-list>\n        <button ion-item *ngFor="let item of items" (click)="itemTapped($event, item)">\n            <ion-icon [name]="item.icon" item-start></ion-icon>\n            {{item.title}}\n            <div class="item-note" item-end>\n                {{item.note}}\n            </div>\n        </button>\n    </ion-list>\n    <div *ngIf="selectedItem" padding>\n        You navigated here from <b>{{selectedItem.title}}</b>\n    </div>\n</ion-content>\n'/*ion-inline-end:"/Users/ahaha0807/Documents/Programings/product/CryptocurrencyClient/src/pages/list/list.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
    ], ListPage);
    return ListPage;
    var ListPage_1;
}());

//# sourceMappingURL=list.js.map

/***/ }),

/***/ 205:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(227);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 227:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_list_list__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_not_singed_home_not_singed_home__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_assets_view_assets_view__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_assets_edit_assets_edit__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_status_bar__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_splash_screen__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_common_http__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_rest_rest__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_storage__ = __webpack_require__(203);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};














var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_not_singed_home_not_singed_home__["a" /* NotSingedHomePage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_assets_view_assets_view__["a" /* AssetsViewPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_assets_edit_assets_edit__["a" /* AssetsEditPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_11__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/assets-edit/assets-edit.module#AssetsEditPageModule', name: 'AssetsEditPage', segment: 'assets-edit', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/assets-view/assets-view.module#AssetsViewPageModule', name: 'AssetsViewPage', segment: 'assets-view', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/not-singed-home/not-singed-home.module#NotSingedHomePageModule', name: 'NotSingedHomePage', segment: 'not-singed-home', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_13__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_not_singed_home_not_singed_home__["a" /* NotSingedHomePage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_assets_view_assets_view__["a" /* AssetsViewPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_assets_edit_assets_edit__["a" /* AssetsEditPage */],
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_12__providers_rest_rest__["a" /* RestProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 274:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_list_list__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_assets_view_assets_view__ = __webpack_require__(102);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */] },
            { title: 'List', component: __WEBPACK_IMPORTED_MODULE_5__pages_list_list__["a" /* ListPage */] },
            { title: 'AssetsView', component: __WEBPACK_IMPORTED_MODULE_6__pages_assets_view_assets_view__["a" /* AssetsViewPage */] }
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Nav */]),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Nav */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Nav */]) === "function" && _a || Object)
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/ahaha0807/Documents/Programings/product/CryptocurrencyClient/src/app/app.html"*/'<ion-menu [content]="content">\n    <ion-header>\n        <ion-toolbar>\n            <ion-title>Menu</ion-title>\n        </ion-toolbar>\n    </ion-header>\n\n    <ion-content>\n        <ion-list>\n            <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n                {{p.title}}\n            </button>\n        </ion-list>\n    </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"/Users/ahaha0807/Documents/Programings/product/CryptocurrencyClient/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]) === "function" && _d || Object])
    ], MyApp);
    return MyApp;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 50:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AssetsEditPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_rest_rest__ = __webpack_require__(78);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the AssetsEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AssetsEditPage = (function () {
    function AssetsEditPage(navCtrl, navParams, restProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.restProvider = restProvider;
        this.restProvider.getSelectableCoinList()
            .then(function (data) {
            _this.selectableCoinList = data;
        });
        this.restProvider.getAssets()
            .then(function (data) {
            _this.userAssetsList = data;
        });
    }
    AssetsEditPage.prototype.getInputCoinName = function () {
        var _this = this;
        var timeoutMS = 400;
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(function () {
            // timeoutMS秒間の入力待機後、画面に描画される
            _this.filteringCoinList(_this.selectedCoinName.toLowerCase());
            _this.isInput = _this.selectedCoinName != "";
        }, timeoutMS);
    };
    AssetsEditPage.prototype.selectCoinName = function () {
        this.selectedCoinName = '';
        this.isInput = this.selectedCoinName != "";
    };
    AssetsEditPage.prototype.hoge = function () {
        console.log("hoge");
    };
    AssetsEditPage.prototype.filteringCoinList = function (input) {
        var rawCoinList = this.selectableCoinList;
        this.matchedCoinList = rawCoinList.filter(function (element) {
            return element.id.toLowerCase().indexOf(input) > -1 ||
                element.name.toLowerCase().indexOf(input) > -1 ||
                element.symbol.toLowerCase().indexOf(input) > -1;
        });
        this.isNotFound = this.matchedCoinList.length <= 0;
    };
    AssetsEditPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-assets-edit',template:/*ion-inline-start:"/Users/ahaha0807/Documents/Programings/product/CryptocurrencyClient/src/pages/assets-edit/assets-edit.html"*/'<!--\n  Generated template for the AssetsEditPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>アセット編集画面</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <ion-card>\n        <ion-card-header>\n            コイン銘柄追加\n        </ion-card-header>\n        <ion-card-content>\n            <ion-item>\n                <ion-label color="primary">\n                    <ion-icon name="search"></ion-icon>\n                </ion-label>\n                <ion-input placeholder="例）Bitcoin, BTC, bitcoin"\n                           (input)="getInputCoinName()"\n                           id="assets-edit-coin-add-form"\n                           [(ngModel)]="selectedCoinName"></ion-input>\n            </ion-item>\n\n            <ion-list inset *ngIf="isInput">\n                <button ion-item *ngFor="let coin of matchedCoinList" (click)="selectCoinName(coin.id)">\n                    {{coin.name}}（{{coin.symbol}}）\n                </button>\n            </ion-list>\n\n            <ion-item *ngIf="isNotFound" text-wrap>\n                一致するコインが存在しません。\n                選択できないコインの可能性があります。詳しくは<a href="">こちら</a>\n            </ion-item>\n        </ion-card-content>\n    </ion-card>\n\n    <ion-card>\n        <ion-card-content>\n            <ion-list inset>\n                <li ion-item *ngFor="let asset of userAssetsList">\n                    <ion-label>{{asset.id}}</ion-label>\n                    <ion-input item-right [(ngModel)]="asset.amount" (input)="editAmout()"></ion-input>\n                    <ion-icon name="trash" item-end color="danger" (click)="hoge()"></ion-icon>\n                </li>\n            </ion-list>\n            <!-- コイン銘柄編集・削除フォーム -->\n        </ion-card-content>\n    </ion-card>\n</ion-content>\n'/*ion-inline-end:"/Users/ahaha0807/Documents/Programings/product/CryptocurrencyClient/src/pages/assets-edit/assets-edit.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__providers_rest_rest__["a" /* RestProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_rest_rest__["a" /* RestProvider */]) === "function" && _c || Object])
    ], AssetsEditPage);
    return AssetsEditPage;
    var _a, _b, _c;
}());

//# sourceMappingURL=assets-edit.js.map

/***/ }),

/***/ 78:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RestProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var RestProvider = (function () {
    function RestProvider(http) {
        this.http = http;
        this.baseUrl = 'http://localhost:3000';
        console.log('Hello RestProvider Provider');
    }
    RestProvider.prototype.getAssets = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(_this.baseUrl + '/assets' + '?_sort=amount&_order=asc') // FIXME: ここのQueryStringはMock用
                .subscribe(function (data) {
                resolve(data);
            }, function (err) {
                reject(err);
            });
        });
    };
    RestProvider.prototype.postAsset = function (id, amount) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.baseUrl + '/assets', {
                amount: amount,
                id: id,
            })
                .subscribe(function (data) {
                resolve(data);
            }, function (err) {
                reject(err);
            });
        });
    };
    RestProvider.prototype.getSelectableCoinList = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get(_this.baseUrl + '/coinIds')
                .subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    RestProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], RestProvider);
    return RestProvider;
}());

//# sourceMappingURL=rest.js.map

/***/ })

},[205]);
//# sourceMappingURL=main.js.map