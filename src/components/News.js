import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component'
const News = (props) => {
    const [articales, setArticales] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResult, setTotalResult] = useState(0)
    const fetching = async () => {
        props.setProgress(10)
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        const data = await fetch(url);
        props.setProgress(30)
        const parseData = await data.json();
        props.setProgress(70)
        setArticales(parseData.articles)
        setTotalResult(parseData.totalResults)
        setLoading(false)
        props.setProgress(100);
    }
    useEffect(() => {
        fetching();
    }, [])
    const fetchMoreData = async () => {
        setPage(page + 1)
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
        const data = await fetch(url);
        const parseData = await data.json();
        setArticales(articales.concat(parseData.articles))
        setTotalResult(parseData.totalResults)
    };
    return (
        <>
            {loading ? <Spinner /> : ""}
            <InfiniteScroll
                dataLength={articales.length}
                next={fetchMoreData}
                hasMore={articales.length !== totalResult}
                loader={<Spinner />}>
                <h1 className='text-center'>News App</h1>
                <div className='container'>
                    <div className="row">
                        {articales.map((element) => {
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
News.defaultProps = {
    country: 'in',
    pageSize: 5,
    category: 'general'
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}
export default News;