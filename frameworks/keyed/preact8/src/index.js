"use strict";

import { render, h, Component } from "preact";
import { Row } from "./Row";
import { Store } from "./store";

class Header extends Component {
	shouldComponentUpdate() {
		return false;
	}
	render(props) {
		return (
			<div className="jumbotron">
				<div className="row">
					<div className="col-md-6">
						<h1>preact 8</h1>
					</div>
					<div className="col-md-6">
						<div className="row">
							<div className="col-sm-6 smallpad">
								<button
									type="button"
									className="btn btn-primary btn-block"
									id="run"
									onClick={props.run}
								>
									Create 1,000 rows
								</button>
							</div>
							<div className="col-sm-6 smallpad">
								<button
									type="button"
									className="btn btn-primary btn-block"
									id="runlots"
									onClick={props.runLots}
								>
									Create 10,000 rows
								</button>
							</div>
							<div className="col-sm-6 smallpad">
								<button
									type="button"
									className="btn btn-primary btn-block"
									id="add"
									onClick={props.add}
								>
									Append 1,000 rows
								</button>
							</div>
							<div className="col-sm-6 smallpad">
								<button
									type="button"
									className="btn btn-primary btn-block"
									id="update"
									onClick={props.update}
								>
									Update every 10th row
								</button>
							</div>
							<div className="col-sm-6 smallpad">
								<button
									type="button"
									className="btn btn-primary btn-block"
									id="clear"
									onClick={props.clear}
								>
									Clear
								</button>
							</div>
							<div className="col-sm-6 smallpad">
								<button
									type="button"
									className="btn btn-primary btn-block"
									id="swaprows"
									onClick={props.swapRows}
								>
									Swap Rows
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export class Main extends Component {
	constructor(props) {
		super(props);
		this.state = { store: new Store() };
		this.select = this.select.bind(this);
		this.delete = this.delete.bind(this);
		this.add = this.add.bind(this);
		this.run = this.run.bind(this);
		this.update = this.update.bind(this);
		this.runLots = this.runLots.bind(this);
		this.clear = this.clear.bind(this);
		this.swapRows = this.swapRows.bind(this);
		this.start = 0;
		this.length = 0;

		window.app = this;
	}
	run() {
		this.state.store.run();
		this.setState({ store: this.state.store });
	}
	add() {
		this.state.store.add();
		this.setState({ store: this.state.store });
	}
	update() {
		this.state.store.update();
		this.setState({ store: this.state.store });
	}
	select(id) {
		this.state.store.select(id);
		this.setState({ store: this.state.store });
	}
	delete(id) {
		this.state.store.delete(id);
		this.setState({ store: this.state.store });
	}
	runLots() {
		this.state.store.runLots();
		this.setState({ store: this.state.store });
	}
	clear() {
		this.state.store.clear();
		this.setState({ store: this.state.store });
	}
	swapRows() {
		this.state.store.swapRows();
		this.setState({ store: this.state.store });
	}
	render() {
		let rows = this.state.store.data.map((d, i) => {
			return (
				<Row
					key={d.id}
					data={d}
					onClick={this.select}
					onDelete={this.delete}
					styleClass={d.id === this.state.store.selected ? "danger" : ""}
				></Row>
			);
		});
		return (
			<div className="container">
				<Header
					run={this.run}
					runLots={this.runLots}
					add={this.add}
					update={this.update}
					clear={this.clear}
					swapRows={this.swapRows}
				/>
				<table className="table table-hover table-striped test-data">
					<tbody>{rows}</tbody>
				</table>
				<span
					className="preloadicon glyphicon glyphicon-remove"
					aria-hidden="true"
				></span>
			</div>
		);
	}
}

render(<Main />, document.getElementById("main"));
