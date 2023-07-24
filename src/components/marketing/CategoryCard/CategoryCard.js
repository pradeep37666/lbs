import './CategoryCard.css'
import { useHistory } from 'react-router-dom'

const CategoryCard = ({ category, categoryCount }) => {
  const history = useHistory()

  const searchByCategory = () => {
    history.push(
      `/search/?keyword=&category=${encodeURIComponent(
        category?.categorySearchParam
      )}`
    )
  }

  return (
    <div
      className='category_card_container'
      key={category.id}
      style={{ backgroundImage: `url(${category.image})` }}
      onClick={searchByCategory}
    >
      <div className='category_card_title_container'>
        <p className='category_card_title'>{category.category}</p>
        {categoryCount && (
          <p className='category_card_items'>{categoryCount.count} items</p>
        )}
      </div>
    </div>
  )
}

export default CategoryCard
