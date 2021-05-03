import * as React from 'react';
import Item from './Item';
import Link from './Link';
import Nav from './Nav';
import List from './List';
import Container from './Container';
import SubContainer from './SubContainer';

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';
type Page = number | string;

const range = (from: number, to: number, step = 1): number[] => {
  const _range = [];

  while (from <= to) {
    _range.push(from);
    from += step;
  }
  return _range;
};

interface Props {
  totalItems: number;
  limit: number;
  pageNeighbors: number;
  onPageChanged: (data: object) => void;
  skip: number;
  loaded: boolean;
  showLabelOnly?: boolean;
}

interface State {
  currentPage: number;
  totalItems?: number;
  loaded?: boolean;
  totalPages?: number;
}

class Paginator extends React.Component<Props, State> {
  limit: number;
  totalItems: number;
  pageNeighbors: number = 1;
  totalPages: number;

  constructor(props: Props) {
    super(props);
    const { totalItems, limit, pageNeighbors } = props;
    this.limit = limit;
    this.totalItems = totalItems;
    this.pageNeighbors =
      typeof pageNeighbors === 'number'
        ? Math.max(0, Math.min(pageNeighbors, 2))
        : 0;
    this.totalPages = Math.ceil(this.totalItems / this.limit); // capture excess records on last page

    this.state = { currentPage: 1 };
  }

  componentDidMount() {
    this.gotoPage(this.state.currentPage);
  }

  componentDidUpdate(prevProps: Props) {
    const { totalItems, limit, skip } = this.props;
    if (prevProps.totalItems === totalItems && prevProps.skip === skip) {
      return;
    }
    this.totalItems = totalItems;
    this.limit = limit;
    this.totalPages = Math.ceil(this.totalItems / this.limit);

    this.setState({
      totalItems,
      totalPages: this.totalPages,
      loaded: this.props.loaded,
    });
    if (skip === 0 && this.state.currentPage !== 1) {
      this.gotoPage(1);
    }
  }

  gotoPage = (page: number) => {
    const { totalItems, onPageChanged } = this.props;
    this.totalItems = totalItems;

    if (this.totalPages < 1) {
      return;
    }

    const currentPage = Math.max(0, Math.min(page, this.totalPages));
    const paginationData = {
      currentPage,
      totalPages: this.totalPages,
      pageLimit: this.limit,
      totalItems: this.totalItems,
      offset: (currentPage - 1) * this.limit,
    };

    this.setState({ currentPage }, () => onPageChanged(paginationData));
  };

  handleClick = (page: number): void => {
    this.gotoPage(page);
  };

  handleMoveLeft = (): void => {
    const page = this.state.currentPage - this.pageNeighbors * 2 - 1;
    this.gotoPage(page);
  };

  handleMoveRight = (): void => {
    const page = this.state.currentPage + this.pageNeighbors * 2 + 1;
    this.gotoPage(page);
  };

  fetchPageNumbers = (): Page[] => {
    /**
     * Let's say we have 10 pages and we set pageNeighbours to 2
     * Given that the current page is 6
     * The pagination control will look like the following:
     *
     * (1) < {4 5} [6] {7 8} > (10)
     *
     * (x) => terminal pages: first and last page(always visible)
     * [x] => represents current page
     * {...x} => represents page neighbours
     */

    const totalPages = this.totalPages;
    const { currentPage } = this.state;
    const pageNeighbors = this.pageNeighbors;

    /**
     * totalNumbers: the total page numbers to show on the control
     * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
     */
    const totalNumbers = pageNeighbors * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbors);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbors);
      let pages: Page[] = range(startPage, endPage);

      /**
       * hasLeftSpill: has hidden pages to the left
       * hasRightSpill: has hidden pages to the right
       * spillOffset: number of hidden pages either to the left or to the right
       */

      const hasLeftSpill = startPage > 2;
      const hasRightSpill = totalPages - endPage > 1;
      const spillOffset = totalNumbers - (pages.length + 1);
      switch (true) {
        // handle: (1) < {5 6} [7] {8 9} (10)
        case hasLeftSpill && !hasRightSpill: {
          const extraPages = range(startPage - spillOffset, startPage - 1);
          pages = [LEFT_PAGE, ...extraPages, ...pages];
          break;
        }

        // handle: (1) {2 3} [4] {5 6} > (10)
        case !hasLeftSpill && hasRightSpill: {
          const extraPages = range(endPage + 1, endPage + spillOffset);
          pages = [...pages, ...extraPages, RIGHT_PAGE];
          break;
        }

        // handle: (1) < {4 5} [6] {7 8} > (10)
        case hasLeftSpill && hasRightSpill:
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
          break;
        }
      }
      return [1, ...pages, totalPages];
    }
    return range(1, totalPages);
  };

  render() {
    const { showLabelOnly, limit, skip } = this.props;
    const { currentPage } = this.state;
    const pages = this.fetchPageNumbers();
    const from = 1 + skip;
    const to = skip + limit > this.totalItems ? this.totalItems : skip + limit;

    if (!this.totalItems || this.totalPages === 1 || !this.props.loaded) {
      return null;
    }

    return (
      <Container className="row">
        <SubContainer className="results-number">
          Showing <strong>{from}</strong> - <strong>{to}</strong> of{' '}
          <strong>{this.totalItems}</strong> items
        </SubContainer>
        {!showLabelOnly && (
          <Nav className="col-sm-6" aria-label="Page navigation">
            <List className="pagination">
              {pages.map((page: number | string, index: number) => {
                if (page === LEFT_PAGE) {
                  return (
                    <Item className="disabled" key={index}>
                      <Link href="javascript://" onClick={this.handleMoveLeft}>
                        <span aria-hidden="true">&laquo;</span>
                      </Link>
                    </Item>
                  );
                }

                if (page === RIGHT_PAGE) {
                  return (
                    <Item className="" key={index}>
                      <Link href="javascript://" onClick={this.handleMoveRight}>
                        <span aria-hidden="true">&raquo;</span>
                      </Link>
                    </Item>
                  );
                }

                return (
                  <Item key={index}>
                    {typeof page === 'number' && (
                      <Link
                        className={page === currentPage ? 'active' : ''}
                        href="javascript://"
                        onClick={() => this.gotoPage(page)}
                      >
                        {page}
                      </Link>
                    )}
                  </Item>
                );
              })}
            </List>
          </Nav>
        )}
      </Container>
    );
  }
}

export default Paginator;
