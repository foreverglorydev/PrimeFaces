import React, { Component } from 'react';
import { PhotoService } from '../../service/PhotoService';
import { Galleria } from '../../components/lib/galleria/Galleria';
import { TabView, TabPanel } from '../../components/lib/tabview/TabView';
import { CodeHighlight } from '../../components/doc/common/codehighlight';
import { DocActions } from '../../components/doc/common/docactions';
import Head from 'next/head';
import getConfig from 'next/config';

export default class GalleriaResponsiveDemo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            images: null
        };

        this.galleriaService = new PhotoService();
        this.itemTemplate = this.itemTemplate.bind(this);
        this.thumbnailTemplate = this.thumbnailTemplate.bind(this);
        this.contextPath = getConfig().publicRuntimeConfig.contextPath;

        this.responsiveOptions = [
            {
                breakpoint: '1024px',
                numVisible: 5
            },
            {
                breakpoint: '960px',
                numVisible: 4
            },
            {
                breakpoint: '768px',
                numVisible: 3
            },
            {
                breakpoint: '560px',
                numVisible: 1
            }
        ];
    }

    componentDidMount() {
        this.galleriaService.getImages().then(data => this.setState({ images: data }));
    }

    itemTemplate(item) {
        return <img src={`${this.contextPath}/${item.itemImageSrc}`} alt={item.alt} style={{ width: '100%', display: 'block' }} />
    }

    thumbnailTemplate(item) {
        return <img src={`${this.contextPath}/${item.thumbnailImageSrc}`} alt={item.alt} style={{ display: 'block' }} />
    }

    render() {
        return (
            <div>
                <Head>
                    <title>React Gallery Component - Responsive</title>
                    <meta name="description" content="Galleria responsiveness is defined with the responsiveOptions property." />
                </Head>
                <div className="content-section introduction">
                    <div className="feature-intro">
                        <h1>Galleria <span>Responsive</span></h1>
                        <p>Galleria responsiveness is defined with the <b>responsiveOptions</b> property.</p>
                    </div>
                    
                    <DocActions github="galleria/responsive.js" />
                </div>

                <div className="content-section implementation">
                    <div className="card">
                        <Galleria value={this.state.images} responsiveOptions={this.responsiveOptions} numVisible={7} circular style={{ maxWidth: '800px' }}
                            item={this.itemTemplate} thumbnail={this.thumbnailTemplate} />
                    </div>
                </div>

                <GalleriaResponsiveDemoDoc></GalleriaResponsiveDemoDoc>
            </div>
        );
    }
}

export class GalleriaResponsiveDemoDoc extends Component {

    shouldComponentUpdate() {
        return false;
    }

    render() {
        return (
            <div className="content-section documentation" id="app-doc">
                <TabView>
                    <TabPanel header="Source">
<CodeHighlight lang="js">
{`
import React, { Component } from 'react';
import { PhotoService } from '../service/PhotoService';
import { Galleria } from 'primereact/galleria';

export class GalleriaResponsiveDemo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            images: null
        };

        this.galleriaService = new PhotoService();
        this.itemTemplate = this.itemTemplate.bind(this);
        this.thumbnailTemplate = this.thumbnailTemplate.bind(this);

        this.responsiveOptions = [
            {
                breakpoint: '1024px',
                numVisible: 5
            },
            {
                breakpoint: '960px',
                numVisible: 4
            },
            {
                breakpoint: '768px',
                numVisible: 3
            },
            {
                breakpoint: '560px',
                numVisible: 1
            }
        ];
    }

    componentDidMount() {
        this.galleriaService.getImages().then(data => this.setState({ images: data }));
    }

    itemTemplate(item) {
        return <img src={item.itemImageSrc} alt={item.alt} style={{ width: '100%', display: 'block' }} />
    }

    thumbnailTemplate(item) {
        return <img src={item.thumbnailImageSrc} alt={item.alt} style={{ display: 'block' }} />
    }

    render() {
        return (
            <div>
                <div className="card">
                    <Galleria value={this.state.images} responsiveOptions={this.responsiveOptions} numVisible={7} circular style={{ maxWidth: '800px' }}
                        item={this.itemTemplate} thumbnail={this.thumbnailTemplate} />
                </div>
            </div>
        );
    }
}
`}
 </CodeHighlight>
                    </TabPanel>
                </TabView>
            </div>
        )
    }
}
