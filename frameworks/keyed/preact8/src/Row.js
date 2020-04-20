"use strict";

import { h, Component } from "preact";

export class Row extends Component {
	constructor(props) {
		super(props);
		this.onDelete = this.onDelete.bind(this);
		this.onClick = this.onClick.bind(this);
	}
	shouldComponentUpdate(nextProps) {
		return (
			nextProps.label !== this.props.label ||
			nextProps.selected !== this.props.selected
		);
	}

	onDelete() {
		this.props.onDelete(this.props.id);
	}
	onClick() {
		this.props.onClick(this.props.id);
	}

	render() {
		let { selected, label, id } = this.props;
		return (
			<tr className={selected ? "danger" : null}>
				<td className="col-md-1">{id}</td>
				<td className="col-md-4">
					<a onClick={this.onClick}>{label}</a>
				</td>
				<td className="col-md-1">
					<a onClick={this.onDelete}>
						<span
							className="glyphicon glyphicon-remove"
							aria-hidden="true"
						></span>
					</a>
				</td>
				<td className="col-md-6"></td>
			</tr>
		);
	}
}
