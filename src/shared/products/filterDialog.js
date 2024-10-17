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

console.log('🚀 ~ FilterTypeByKey ~ FilterTypeByKey:', FilterTypeByKey)

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

const Mask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${(p) => p.theme.color.mask};
  border-radius: ${(p) => p.theme.borderRadius.content};
  z-index: ${(p) => p.theme.zIndex.mask};
`

const Container = styled.div`
  position: absolute;
  color: #000;
  opacity: 1;
  top: 5%;
  width: 60%;
  left: 20%;
  max-height: 70vh;
  z-index: ${(p) => p.theme.zIndex.dialog};
  display: flex;
  min-height: 250px;
  flex-direction: column;
  background: ${(p) => p.theme.color.background};
  border-radius: ${(p) => p.theme.borderRadius.dialogContainer};
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  @media (max-width: 768px) {
    width: 90%;
    left: 5%;
  }
`

const Block = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`

const Header = styled(Block)`
  position: relative;
  background-color: ${(p) => p.theme.color.red};
  top: 0;
  width: 105%;
  left: -2.5%;
  padding: 10px;
  border: 1px solid ${(p) => p.theme.color.red};
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
  border-top: 1px solid ${(p) => p.theme.color.dialogBorder};
  div + div {
    margin-left: 1rem;
  }
`

const Content = styled(Block)`
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

const Tag = styled.div`
  border-radius: 4px;
  padding: 0.5rem 1rem;
  background: ${(p) => p.theme.color.red};
  color: white;
  cursor: pointer;
  margin: 0.5rem 0.25rem 0 0;
`

const BaseSection = styled.div`
  margin-bottom: 0.5rem;
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

const SelectedTag = styled(Tag)`
  background: ${(p) => p.theme.color.orange};
  color: black;
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
            {Object.keys(selectedOptions).map((category) => {
              const setting = FilterTypeByKey[category]
              if (setting.hideInSelected) return null
              switch (setting.type) {
                case 'string':
                  if (!selectedOptions[category]) return null
                  return (
                    <SelectedTag
                      onClick={() =>
                        setSelectedOptions({
                          ...selectedOptions,
                          [category]: null,
                        })
                      }
                    >
                      {selectedOptions[category]}
                    </SelectedTag>
                  )
                case 'array':
                  if (
                    !selectedOptions[category] ||
                    !selectedOptions[category].length
                  )
                    return null
                  return selectedOptions[category]?.map((option) => {
                    return (
                      <SelectedTag
                        onClick={() =>
                          setSelectedOptions({
                            ...selectedOptions,
                            [category]: selectedOptions[category].filter(
                              (o) => o !== option
                            ),
                          })
                        }
                      >
                        {tags.find((t) => t.id === option)?.tagName}
                      </SelectedTag>
                    )
                  })
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
                <Tag key={m.id} onClick={handleClick(FilterType.Tags, m, 'id')}>
                  {m.tagName}
                </Tag>
              )
            })}
          </Section>
          <Section type={FilterType.CommodityCategory}>
            {commodityCategoryOptions[category].map((m) => {
              if (selectedOptions[FilterType.CommodityCategory.key] === m.label)
                return null
              return (
                <Tag
                  key={m.id}
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
            [key]: [...selectedOptions[key], data[dataKey]],
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
