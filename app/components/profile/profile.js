import "./profile.scss";
import template from "./profile.hbs";
import BaseComponent from "../baseComponent";
import ButtonComponent from "../button/button";
import http from "../../modules/http";
import validate from "../../modules/authorization";
import { backend } from "../../modules/constants";

/**
 * Компонент profile
 */
export default class ProfileComponent extends BaseComponent {
	constructor() {
		super();
		this.template = template;
		this._context = {
			changeProfile: false,
		};
	}

	render(context) {
		let newContext = {};

		http.doGet({
			callback(xhr) {
				newContext = JSON.parse(xhr.responseText);
			},
			path: `${backend}/user`,
		});

		super.render(context);
		this._info = this._element.querySelector("[ref=info]");
		this._login = this._element.querySelector("[ref=login]");
		this._pass = this._element.querySelector("[ref=pass]");
		this._info = this._element.querySelector("[ref=info]");

		if (newContext !== {}) {
			this.renderChild("changeProfile", ButtonComponent, {
				text: "Change profile",
				onClick: this._onChangeProfileClick.bind(this),
			});

			this.renderChild("saveProfile", ButtonComponent, {
				text: "Save profile",
				onClick: this._onSaveProfileClick.bind(this),
			});
		}
	}

	_onChangeProfileClick() {
		this._context = {
			changeProfile: true,
		};

		this.render();
	}

	_onSaveProfileClick() {
		const errorInfo = validate(this._login.value, this._pass.value);

		if (errorInfo !== true) {
			this._info.innerText = errorInfo;
		} else {
			http.doPut({
				body: {
					nickname: this._login.value,
					password: this._password.value,
				},
				path: `${backend}/user`,
			});
		}
	}
}