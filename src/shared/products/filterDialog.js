import styled from 'styled-components'
import { Button } from '@app/pages/commodity'
import { useState, useEffect } from 'react'
import { CATEGORY } from '@app/utils/constants'
import { dataStore, useSelector } from '@app/store'
import { Checkbox, Input } from 'antd'

const FilterType = {
  CommodityCategory: {
    key: 'commodityCategory',
    name: '商品子類別',
    type: 'string',
  },
  Keyword: {
    key: 'keyword',
    name: '關鍵字',
    type: 'string',
    hideInSelected: true,
  },
  Manufacturer: {
    key: 'manufacturerName',
    name: '廠商',
    type: 'string',
  },
  IsDiscount: {
    key: 'isDiscount',
    name: '折扣',
    type: 'bool',
    hideInSelected: true,
  },
  Tags: {
    key: 'tagIds',
    name: '標籤',
    type: 'array',
  },
  Selected: {
    key: 'selected',
    name: '已選（點擊移除）',
    hideInSelected: true,
  },
}

const FilterTypeByKey = Object.values(FilterType).reduce((acc, cur) => {
  acc[cur.key] = cur
  return acc
}, {})

export const DefaultFilterOptions = {}

const commodityCategoryOptions = {
  [CATEGORY.GACHA]: [
    { value: '公仔', label: '公仔' },
    { value: '手辦', label: '手辦' },
    { value: '獵奇', label: '獵奇' },
    { value: '文創', label: '文創' },
  ],
  [CATEGORY.BLIND_BOX]: [
    { value: '玩具', label: '玩具' },
    { value: '拼圖', label: '拼圖' },
    { value: '零食', label: '零食' },
    { value: '動漫', label: '動漫' },
    { value: '驚嚇包', label: '驚嚇包' },
  ],
  [CATEGORY.LUCKY_BAG]: [
    { value: '廠商回饋', label: '廠商回饋' },
    { value: '出清', label: '出清' },
    { value: '折扣品', label: '折扣品' },
    { value: '送福利', label: '送福利' },
    { value: '瓜哥送幸福', label: '瓜哥送幸福' },
  ],
  [CATEGORY.ICHIBAN]: [
    { value: '遊戲', label: '遊戲' },
    { value: '電影', label: '電影' },
    { value: '經典聯名', label: '經典聯名' },
    { value: '機甲系列', label: '機甲系列' },
  ],
  [CATEGORY.SPECIAL]: [
    { value: '植栽', label: '植栽' },
    { value: '活體類', label: '活體類' },
    { value: '寵物用品', label: '寵物用品' },
    { value: '生活用品', label: '生活用品' },
    { value: '廠商自製', label: '廠商自製' },
  ],
  [CATEGORY.OUTSIDE_WALL_WORLD]: [
    { value: '精品代購', label: '精品代購' },
    { value: '韓團周邊', label: '韓團周邊' },
    { value: '保養品', label: '保養品' },
    { value: '化妝品', label: '化妝品' },
    { value: '潮流玩物', label: '潮流玩物' },
    { value: '運動用品', label: '運動用品' },
    { value: '服飾品', label: '服飾品' },
  ],
  [CATEGORY.DIGITAL_WORLD]: [
    { value: '智慧型手機', label: '智慧型手機' },
    { value: '智能家電', label: '智能家電' },
    { value: '電動', label: '電動' },
    { value: '電玩周邊', label: '電玩周邊' },
  ],
}

// 定義一個函數，根據類別返回與 #a21a2b 相同色系的顏色
const getCategoryColor = (category) => {
  switch (category) {
    case FilterType.Manufacturer.key:
      return '#a21a2b' // 深紅色
    case FilterType.Tags.key:
      return '#b33951' // 比 #a21a2b 淺一些的紅色
    case FilterType.CommodityCategory.key:
      return '#c75d5d' // 再淺一些的紅色
    case FilterType.Selected.key:
      return '#a21a2b' // 與 Manufacturer 相同的深紅色
    default:
      return '#e1a7a7' // 最淺的紅色，作為默認
  }
}

const Mask = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: ${(p) => p.theme.zIndex.mask};
`

const Container = styled.div`
  position: fixed;
  color: #000;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  max-height: 80vh;
  z-index: ${(p) => p.theme.zIndex.dialog};
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: ${(p) => p.theme.borderRadius.dialogContainer};
  overflow-x: hidden;
  overflow-y: auto;
  @media (max-width: 768px) {
    width: 90%;
  }
`

const Block = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`

const Header = styled(Block)`
  position: relative;
  background-color: #a21a2b;
  top: 0;
  padding: 10px;
  color: white;
  h3 {
    margin: 0;
  }
`

const Footer = styled(Block)`
  position: relative;
  bottom: 0;
  left: 0;
  padding: 10px;
  justify-content: center;
  border-top: 1px solid #ccc;
  button + button {
    margin-left: 1rem;
  }
`

const Content = styled.div`
  padding: 20px;
  flex-direction: column;
  overflow-y: auto;
  .ant-radio-group {
    display: flex;
    flex-direction: column;
    > * {
      margin-bottom: 0.5rem;
    }
  }
`

// 修改 Tag 組件，設置字體為粗體，顏色為與 #a21a2b 相同的色系
const Tag = styled.div`
  border-radius: 4px;
  padding: 0.5rem 1rem;
  background: ${(p) => getCategoryColor(p.category)};
  color: white;
  cursor: pointer;
  margin: 0.5rem 0.25rem 0 0;
  font-weight: bold;
`

// 修改 SelectedTag 組件，保持字體顏色為白色
const SelectedTag = styled(Tag)`
  border: 2px solid #000;
`

const BaseSection = styled.div`
  margin-bottom: 1rem;
  h3 {
    display: block;
    margin: 0.5rem 0;
  }
  .content {
    display: flex;
    flex-wrap: wrap;
    h3 {
      margin-left: 0.5rem;
    }
  }
`

export default function FilterDialog({
  onClose,
  category,
  filterOptions,
  setFilterOptions,
}) {
  const [selectedOptions, setSelectedOptions] = useState(filterOptions)
  const manufacturers = useSelector(() => dataStore.manufacturers)
  const tagsByCategory = useSelector(() => dataStore.tagsByCategory)
  const tags = tagsByCategory[category]
  useEffect(() => {
    if (!manufacturers) dataStore.getManufacturers()
  }, [manufacturers])

  useEffect(() => {
    if (!tags) dataStore.getTags(category)
  }, [tags])

  useEffect(() => {
    setSelectedOptions(filterOptions)
  }, [filterOptions])

  return (
    <>
      <Mask onClick={onClose} />
      <Container>
        <Header>
          <h3>篩選</h3>
        </Header>
        <Content>
          <Section type={FilterType.Selected}>
            {Object.keys(selectedOptions).map((categoryKey) => {
              const setting = FilterTypeByKey[categoryKey]
              if (setting.hideInSelected) return null
              switch (setting.type) {
                case 'string':
                  if (!selectedOptions[categoryKey]) return null
                  return (
                    <SelectedTag
                      key={categoryKey}
                      category={categoryKey}
                      onClick={() =>
                        setSelectedOptions({
                          ...selectedOptions,
                          [categoryKey]: null,
                        })
                      }
                    >
                      {selectedOptions[categoryKey]}
                    </SelectedTag>
                  )
                case 'array':
                  if (
                    !selectedOptions[categoryKey] ||
                    !selectedOptions[categoryKey].length
                  )
                    return null
                  return selectedOptions[categoryKey]?.map((option) => {
                    const tagLabel =
                      categoryKey === FilterType.Tags.key
                        ? tags.find((t) => t.id === option)?.tagName
                        : option
                    return (
                      <SelectedTag
                        key={option}
                        category={categoryKey}
                        onClick={() =>
                          setSelectedOptions({
                            ...selectedOptions,
                            [categoryKey]: selectedOptions[categoryKey].filter(
                              (o) => o !== option
                            ),
                          })
                        }
                      >
                        {tagLabel}
                      </SelectedTag>
                    )
                  })
                default:
                  return null
              }
            })}
          </Section>
          <Section type={FilterType.Manufacturer}>
            {manufacturers?.map((m) => {
              if (selectedOptions[FilterType.Manufacturer.key] === m.name)
                return null
              return (
                <Tag
                  key={m.id}
                  category={FilterType.Manufacturer.key}
                  onClick={handleClick(FilterType.Manufacturer, m, 'name')}
                >
                  {m.name}
                </Tag>
              )
            })}
          </Section>
          <Section type={FilterType.Tags}>
            {tags?.map((m) => {
              if (selectedOptions[FilterType.Tags.key]?.includes(m.id))
                return null
              return (
                <Tag
                  key={m.id}
                  category={FilterType.Tags.key}
                  onClick={handleClick(FilterType.Tags, m, 'id')}
                >
                  {m.tagName}
                </Tag>
              )
            })}
          </Section>
          <Section type={FilterType.CommodityCategory}>
            {commodityCategoryOptions[category]?.map((m) => {
              if (selectedOptions[FilterType.CommodityCategory.key] === m.label)
                return null
              return (
                <Tag
                  key={m.value}
                  category={FilterType.CommodityCategory.key}
                  onClick={handleClick(
                    FilterType.CommodityCategory,
                    m,
                    'label'
                  )}
                >
                  {m.label}
                </Tag>
              )
            })}
          </Section>
          <Section type={FilterType.Keyword}>
            <Input
              placeholder="輸入關鍵字"
              value={selectedOptions[FilterType.Keyword.key]}
              onChange={(e) => {
                setSelectedOptions({
                  ...selectedOptions,
                  [FilterType.Keyword.key]: e.target.value,
                })
              }}
            />
          </Section>
          <Section>
            <Checkbox
              checked={selectedOptions[FilterType.IsDiscount.key]}
              onChange={(e) => {
                setSelectedOptions({
                  ...selectedOptions,
                  [FilterType.IsDiscount.key]: e.target.checked,
                })
              }}
            />
            <h3>折扣</h3>
          </Section>
        </Content>
        <Footer>
          <Button onClick={onClose}>關閉</Button>
          <Button onClick={onReset}>重置</Button>
          <Button onClick={onConfirm}>確認</Button>
        </Footer>
      </Container>
    </>
  )
  function handleClick(filterType, data, dataKey) {
    const key = filterType.key
    switch (filterType.type) {
      case 'string':
        return () => {
          setSelectedOptions({
            ...selectedOptions,
            [key]: data[dataKey],
          })
        }
      case 'array':
        return () => {
          setSelectedOptions({
            ...selectedOptions,
            [key]: [...(selectedOptions[key] || []), data[dataKey]],
          })
        }
      default:
        return () => {
          setSelectedOptions({
            ...selectedOptions,
            [key]: data[dataKey],
          })
        }
    }
  }
  function onConfirm() {
    setFilterOptions(selectedOptions)
    onClose()
  }
  function onReset() {
    setSelectedOptions({})
  }
}

function Section({ type, children }) {
  return (
    <BaseSection>
      {!!type?.name && <h3>{type.name}</h3>}
      <div className="content">{children}</div>
    </BaseSection>
  )
}
