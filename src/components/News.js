import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component'
export default class News extends Component {
    articales = [

    ]
    static defaultProps = {
        country: 'in',
        pageSize: 5,
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    constructor() {
        super();
        this.state = {
            articales: this.articales,
            loading: true,
            page: 1,
            totalResult: 0
        }
    }
    fetching = async () => {
        this.props.setProgress(10)
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        const data = await fetch(url);
        this.props.setProgress(30)
        const parseData = await data.json();
        this.props.setProgress(70)
        this.setState({ articales: parseData.articles, totalResult: parseData.totalResults, loading: false });
        this.props.setProgress(100);
    }
    async componentDidMount() {
        this.fetching();
    }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        const data = await fetch(url);
        const parseData = await data.json();
        this.setState({
            articales: this.state.articales.concat(parseData.articles),
            totalResult: parseData.totalResults,
        });
    };
    render() {
        return (
            <>
                {this.state.loading ? <Spinner /> : ""}
                <InfiniteScroll
                    dataLength={this.state.articales.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articales.length !== this.state.totalResult}
                    loader={<Spinner />}>
                    <h1 className='text-center'>News App</h1>
                    <div className='container'>
                        <div className="row">
                            {this.state.articales.map((element) => {
                                return <div className="col-md-4" key={element.url ? element.url : ""}>
                                    <NewsItem title={element.title ? element.title : " "} description={element.description ? element.description : " "} imageUrl={element.urlToImage ? element.urlToImage : " "} newsUrl={element.url ? element.url : " "} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </>
        )
    }
}