import React, { Component } from 'react';
import { ProgressBar } from '../../components/lib/progressbar/ProgressBar';
import { Toast } from '../../components/lib/toast/Toast';
import { ProgressBarDoc } from '../../components/doc/progressbar';
import { DocActions } from '../../components/doc/common/docactions';
import Head from 'next/head';

export default class ProgressBarDemo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value1: 0
        };

        this.displayValueTemplate = this.displayValueTemplate.bind(this);
    }

    displayValueTemplate(value) {
        return (
            <React.Fragment>
                {value}/<b>100</b>
            </React.Fragment>
        );
    }

    componentDidMount() {
        let val = this.state.value1;
        this.interval = setInterval(() => {
            val += Math.floor(Math.random() * 10) + 1;

            if (val >= 100) {
                val = 100;
                this.toast.show({ severity: 'info', summary: 'Success', detail: 'Process Completed' });
                clearInterval(this.interval);
            }

            this.setState({
                value1: val
            });
        }, 2000);
    }

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    render() {
        return (
            <div>
                <Head>
                    <title>React ProgressBar Component</title>
                    <meta name="description" content="ProgressBar is a process status indicator." />
                </Head>
                <div className="content-section introduction">
                    <div className="feature-intro">
                        <h1>ProgressBar</h1>
                        <p>ProgressBar is a process status indicator.</p>
                    </div>
                      
                    <DocActions github="progressbar/index.js" />
                </div>

                <div className="content-section implementation">
                    <Toast ref={(el) => this.toast = el}></Toast>

                    <div className="card">
                        <h5>Dynamic</h5>
                        <ProgressBar value={this.state.value1}></ProgressBar>

                        <h5>Static</h5>
                        <ProgressBar value={50}></ProgressBar>

                        <h5>Custom display value</h5>
                        <ProgressBar value={40} displayValueTemplate={this.displayValueTemplate}></ProgressBar>

                        <h5>Indeterminate</h5>
                        <ProgressBar mode="indeterminate" style={{ height: '6px' }}></ProgressBar>
                    </div>
                </div>

                <ProgressBarDoc />
            </div>
        );
    }
}
