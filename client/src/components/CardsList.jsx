import { forwardRef, memo } from 'react'
import { FixedSizeList as List, areEqual } from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader'
import memoize from 'memoize-one'
import { getBackgroundColorByNucleo } from '../services/colors'
import CardBrick, { CardBrickSkeleton } from './CardBrick'
// useMemo, memo e memoize são recursos que vão ser utilizados para melhorar a performance do App

export default function CardsList({
  rows,
  hasNextPage,
  isNextPageLoading,
  loadNextPage,
  columnsQtd,
  listHeight,
  listItemHeight,
}) {
  // Retorna um skeleton (esqueleto) dos usuários (users) que serão exibidos na tela ao scrollar
  const RowSkeleton = Array.from(Array(columnsQtd).keys()).map((key) => (
    <CardBrickSkeleton key={key} />
  ))

  const itemCount = hasNextPage ? rows.length + 1 : rows.length
  const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage
  const isItemLoaded = (index) => !hasNextPage || index < rows.length

  const itemData = createItemData(rows, RowSkeleton, isItemLoaded)

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

const createItemData = memoize((rows, RowSkeleton, isItemLoaded) => ({
  rows,
  RowSkeleton,
  isItemLoaded,
}))

const Row = memo(({ data, index, style, isScrolling }) => {
  const { rows, RowSkeleton, isItemLoaded } = data

  const columns = rows[index]

  return (
    <div style={style}>
      <div className={`flex justify-center gap-3`}>
        {!isItemLoaded(index) || isScrolling
          ? RowSkeleton
          : columns.map((user) => (
              <CardBrick
                key={user.id}
                color={getBackgroundColorByNucleo(user.department)}
                picture={user.picture}
                name={
                  user.name.split(' ')[0].length > 10
                    ? user.name.split(' ')[0].slice(0, 10) + '...'
                    : user.name.split(' ')[0]
                }
                userId={user.id}
              />
            ))}
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
