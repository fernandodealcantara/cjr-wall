import { forwardRef, memo } from 'react'
import { FixedSizeList as List, areEqual } from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader'
import memoize from 'memoize-one'
import { getBackgroundColorByNucleo } from '../services/colors'
import CardBrick, { CardBrickSkeleton } from './CardBrick'
import { Link } from 'react-router-dom'

// useMemo, memo e memoize são recursos que vão ser utilizados para melhorar a performance do App

export default function CardsContainer({
  usersRows,
  hasNextPage,
  isNextPageLoading,
  loadNextPage,
  columnsQtd,
  listHeight,
  listItemHeight,
}) {
  // Retorna um skeleton (esqueleto) dos usuários (users) que serão exibidos na tela ao scrollar
  const ChunkSkeleton = Array.from(Array(columnsQtd).keys()).map((key) => (
    <CardBrickSkeleton key={key} />
  ))

  const itemCount = hasNextPage ? usersRows.length + 1 : usersRows.length
  const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage
  const isItemLoaded = (index) => !hasNextPage || index < usersRows.length

  const itemData = createItemData(usersRows, ChunkSkeleton, isItemLoaded)

  return (
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={itemCount}
      loadMoreItems={loadMoreItems}
    >
      {({ onItemsRendered, ref }) => (
        <List
          itemCount={itemCount}
          height={listHeight}
          itemSize={listItemHeight}
          itemData={itemData}
          width="100%"
          innerElementType={innerElementType}
          useIsScrolling
          onItemsRendered={onItemsRendered}
          ref={ref}
        >
          {Row}
        </List>
      )}
    </InfiniteLoader>
  )
}

const createItemData = memoize((usersRows, ChunkSkeleton, isItemLoaded) => ({
  usersRows,
  ChunkSkeleton,
  isItemLoaded,
}))

const Row = memo(({ data, index, style, isScrolling }) => {
  const { usersRows, ChunkSkeleton, isItemLoaded } = data

  const chunk = usersRows[index]

  return (
    <div style={style}>
      <div className={`flex justify-center gap-1`}>
        {!isItemLoaded(index) || isScrolling
          ? ChunkSkeleton
          : chunk.map((user, key) =>
              user ? (
                <Link key={user.id} to={`profile/${user.id}`}>
                  <CardBrick
                    color={getBackgroundColorByNucleo(user.department)}
                    picture={user.picture}
                    name={
                      user.name.split(' ')[0].length > 10
                        ? user.name.split(' ')[0].slice(0, 10) + '...'
                        : user.name.split(' ')[0]
                    }
                  />
                </Link>
              ) : (
                <div key={key} className="hidden" />
              )
            )}
      </div>
    </div>
  )
}, areEqual)

const innerElementType = forwardRef(({ style, ...rest }, ref) => (
  <div
    ref={ref}
    style={{
      ...style,
      margin: '0 auto',
      marginTop: '1rem',
      maxWidth: '95%',
      position: 'relative',
    }}
    {...rest}
  />
))
