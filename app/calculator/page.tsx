"use client"

import React from 'react'
import { useState, useMemo, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { FunnelChart, Funnel, ResponsiveContainer, Cell, Tooltip, LabelList } from 'recharts'
import { DollarSignIcon, PlusCircle, ChevronUp, ChevronDown, Pencil, Lock, Trash2, Moon, Sun } from 'lucide-react'
import { TooltipProvider } from "@/components/ui/tooltip"

type FunnelStage = {
  id: string
  name: string
  currentValue: number
  newValue: number
  currentConversionRate: number
  newConversionRate: number
  improvement?: string | null
}

type ScaleType = 'linear' | 'logarithmic'

const CustomizedLabel = (props: any) => {
  const { x, y, width, height, fill, index, improvement } = props
  const isLeft = index % 2 === 0
  const textAnchor = isLeft ? "end" : "start"
  const xPosition = isLeft ? x - 10 : x + width + 10

  if (!improvement) return null

  return (
    <text
      x={xPosition}
      y={y + height / 2}
      fill="#10B981"
      textAnchor={textAnchor}
      dominantBaseline="central"
      className="text-xs font-bold"
    >
      +{improvement}% Improvement
    </text>
  )
}

export default function FunnelCalculator() {
  const [funnelData, setFunnelData] = useState<FunnelStage[]>([
    { id: '1', name: 'Monthly Views', currentValue: 100000, newValue: 100000, currentConversionRate: 100, newConversionRate: 100 },
    { id: '2', name: 'Profile Visits', currentValue: 2000, newValue: 2000, currentConversionRate: 2, newConversionRate: 2 },
    { id: '3', name: 'Link In Bio Clicks', currentValue: 400, newValue: 400, currentConversionRate: 20, newConversionRate: 20 },
    { id: '4', name: 'Applications Started', currentValue: 340, newValue: 340, currentConversionRate: 85, newConversionRate: 85 },
    { id: '5', name: 'Applications Completed', currentValue: 119, newValue: 204, currentConversionRate: 35, newConversionRate: 35 },
    { id: '6', name: 'Calls Booked', currentValue: 42, newValue: 122, currentConversionRate: 35, newConversionRate: 35 },
    { id: '7', name: 'Shows', currentValue: 29, newValue: 85, currentConversionRate: 70, newConversionRate: 70 },
    { id: '8', name: 'Closes', currentValue: 9, newValue: 26, currentConversionRate: 30, newConversionRate: 30 },
  ])
  const [oldPrice, setOldPrice] = useState(5000)
  const [newPrice, setNewPrice] = useState(5000)
  const [isEditing, setIsEditing] = useState(false)
  const [scaleType, setScaleType] = useState<ScaleType>('logarithmic')
  const [isAnnual, setIsAnnual] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  const calculatedData = useMemo(() => {
    let cumulativeCurrentValue = funnelData[0].currentValue
    let cumulativeNewValue = funnelData[0].newValue
    
    const data = funnelData.map((stage, index) => {
      let currentValue = stage.currentValue
      let newValue = stage.newValue

      if (index > 0) {
        currentValue = Math.round(cumulativeCurrentValue * (stage.currentConversionRate / 100))
        newValue = Math.round(cumulativeNewValue * (stage.newConversionRate / 100))
      }

      cumulativeCurrentValue = currentValue
      cumulativeNewValue = newValue

      const improvement = ((newValue - currentValue) / currentValue) * 100

      return {
        ...stage,
        currentValue,
        newValue,
        improvement: improvement > 0 ? improvement.toFixed(1) : null
      }
    })

    const lastStage = data[data.length - 1]
    const currentRevenue = lastStage.currentValue * oldPrice
    const newRevenue = lastStage.newValue * newPrice
    const totalRevenueIncrease = newRevenue - currentRevenue

    return { data, totalRevenueIncrease }
  }, [funnelData, oldPrice, newPrice])

  const { currentRevenue, newRevenue, totalRevenueSaved } = useMemo(() => {
    const lastStage = calculatedData.data[calculatedData.data.length - 1]
    const monthlyCurrentRevenue = lastStage.currentValue * oldPrice
    const monthlyNewRevenue = lastStage.newValue * newPrice
    const monthlyTotalRevenueSaved = monthlyNewRevenue - monthlyCurrentRevenue
    
    return {
      currentRevenue: isAnnual ? monthlyCurrentRevenue * 12 : monthlyCurrentRevenue,
      newRevenue: isAnnual ? monthlyNewRevenue * 12 : monthlyNewRevenue,
      totalRevenueSaved: isAnnual ? monthlyTotalRevenueSaved * 12 : monthlyTotalRevenueSaved,
    }
  }, [calculatedData.data, oldPrice, newPrice, isAnnual])

  const logScale = (value: number) => Math.log10(value + 1)

  const transformedData = useMemo(() => {
    const maxCurrentValue = Math.max(...calculatedData.data.map(d => d.currentValue))
    const maxNewValue = Math.max(...calculatedData.data.map(d => d.newValue))
    const maxLogValue = Math.max(logScale(maxCurrentValue), logScale(maxNewValue))

    return calculatedData.data.map(d => ({
      ...d,
      currentValueScaled: scaleType === 'logarithmic' ? logScale(d.currentValue) / maxLogValue : d.currentValue / maxCurrentValue,
      newValueScaled: scaleType === 'logarithmic' ? logScale(d.newValue) / maxLogValue : d.newValue / maxNewValue
    }))
  }, [calculatedData.data, scaleType])

  const handleNameChange = (index: number, newName: string) => {
    setFunnelData(prev => prev.map((stage, i) => 
      i === index ? { ...stage, name: newName } : stage
    ))
  }

  const handleValueChange = (index: number, newValue: number, isCurrent: boolean) => {
    setFunnelData(prev => {
      const updatedData = [...prev]
      updatedData[index] = { ...updatedData[index], [isCurrent ? 'currentValue' : 'newValue']: newValue }
      if (index > 0) {
        const previousStage = updatedData[index - 1]
        const newRate = (newValue / previousStage[isCurrent ? 'currentValue' : 'newValue']) * 100
        updatedData[index][isCurrent ? 'currentConversionRate' : 'newConversionRate'] = parseFloat(newRate.toFixed(2))
      }
      for (let i = index + 1; i < updatedData.length; i++) {
        const prevStage = updatedData[i - 1]
        const currentValue = Math.round(prevStage.currentValue * (updatedData[i].currentConversionRate / 100))
        const newValue = Math.round(prevStage.newValue * (updatedData[i].newConversionRate / 100))
        updatedData[i] = { ...updatedData[i], currentValue, newValue }
      }
      return updatedData
    })
  }

  const handleConversionRateChange = (index: number, newRate: number, isCurrent: boolean) => {
    setFunnelData(prev => {
      const updatedData = [...prev]
      updatedData[index] = { ...updatedData[index], [isCurrent ? 'currentConversionRate' : 'newConversionRate']: newRate }
      for (let i = index; i < updatedData.length; i++) {
        const prevStage = i > 0 ? updatedData[i - 1] : { currentValue: updatedData[0].currentValue, newValue: updatedData[0].newValue }
        const currentValue = Math.round(prevStage.currentValue * (updatedData[i].currentConversionRate / 100))
        const newValue = Math.round(prevStage.newValue * (updatedData[i].newConversionRate / 100))
        updatedData[i] = { ...updatedData[i], currentValue, newValue }
      }
      return updatedData
    })
  }

  const addStep = (index: number) => {
    const newId = (parseInt(funnelData[funnelData.length - 1].id) + 1).toString()
    const newStep = {
      id: newId,
      name: `New Step ${newId}`,
      currentValue: 0,
      newValue: 0,
      currentConversionRate: 100,
      newConversionRate: 100
    }
    setFunnelData(prev => [
      ...prev.slice(0, index + 1),
      newStep,
      ...prev.slice(index + 1)
    ])
  }

  const moveStep = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index > 0) || (direction === 'down' && index < funnelData.length - 1)) {
      const newIndex = direction === 'up' ? index - 1 : index + 1
      setFunnelData(prev => {
        const newData = [...prev]
        ;[newData[index], newData[newIndex]] = [newData[newIndex], newData[index]]
        return newData
      })
    }
  }

  const deleteStep = (index: number) => {
    if (funnelData.length > 2) {
      setFunnelData(prev => prev.filter((_, i) => i !== index))
    }
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className={`p-4 rounded-lg shadow-lg border ${
          isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-800 border-gray-200'
        }`}>
          <p className="font-semibold">{data.name}</p>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Current Value: {data.currentValue.toLocaleString()}</p>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>New Value: {data.newValue.toLocaleString()}</p>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Current Conversion Rate: {data.currentConversionRate.toFixed(2)}%</p>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>New Conversion Rate: {data.newConversionRate.toFixed(2)}%</p>
        </div>
      )
    }
    return null
  }


  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#A4DE6C', '#D0ED57']

  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  return (
    <TooltipProvider>
      <div className={`min-h-screen bg-gradient-to-br ${isDarkMode ? 'from-gray-900 to-gray-800' : 'from-gray-50 to-gray-100'} p-4 md:p-8`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Market Vision Revenue Optimizer</h1>
            <div className="flex gap-4">
              <Button onClick={() => setIsDarkMode(!isDarkMode)} variant="outline" className={isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : ''}>
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-[400px,1fr] gap-6">
            <div>
              <Card className={`h-full overflow-hidden ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'} shadow-sm hover:shadow-md border-2 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <CardHeader className="py-4 flex flex-row justify-between items-center">
                  <CardTitle className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    Funnel Settings
                  </CardTitle>
                  <Button 
                    onClick={() => setIsEditing(!isEditing)}
                    variant="outline" 
                    size="sm"
                    className={`${isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : ''}`}
                  >
                    {isEditing ? <><Lock className="w-4 h-4 mr-2" /> Lock</> : <><Pencil className="w-4 h-4 mr-2" /> Edit</>}
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditing ? (
                    <>
                      <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Program Price</h3>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Label htmlFor="old-price" className={`w-20 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Old Price:</Label>
                            <Input
                              id="old-price"
                              type="number"
                              value={oldPrice}
                              onChange={(e) => setOldPrice(parseInt(e.target.value) || 0)}
                              className={`flex-grow h-8 ${isDarkMode ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'} focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50`}
                            />
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Label htmlFor="new-price" className={`w-20 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>New Price:</Label>
                            <Input
                              id="new-price"
                              type="number"
                              value={newPrice}
                              onChange={(e) => setNewPrice(parseInt(e.target.value) || 0)}
                              className={`flex-grow h-8 ${isDarkMode ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'} focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50`}
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Program Price</h3>
                    </div>
                  )}
                  {funnelData.map((stage, index) => (
                    <React.Fragment key={stage.id}>
                      {isEditing && index > 0 && (
                        <div className="flex justify-center my-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => addStep(index)}
                            className={`${isDarkMode ? 'text-white hover:bg-gray-600' : ''}`}
                          >
                            <PlusCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                      <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        <div className="flex items-center justify-between mb-2">
                          {isEditing ? (
                            <Input
                              value={stage.name}
                              onChange={(e) => handleNameChange(index, e.target.value)}
                              className={`w-full min-w-0 font-semibold text-lg ${isDarkMode ? 'text-white bg-gray-600' : 'text-gray-800 bg-white'} border-none focus:ring-0`}
                            />
                          ) : (
                            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{stage.name}</h3>
                          )}
                          {isEditing && (
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm" onClick={() => moveStep(index, 'up')} disabled={index === 0} className={isDarkMode ? 'text-white hover:bg-gray-600' : ''}>
                                <ChevronUp className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => moveStep(index, 'down')} disabled={index === funnelData.length - 1} className={isDarkMode ? 'text-white hover:bg-gray-600' : ''}>
                                <ChevronDown className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => deleteStep(index)} disabled={funnelData.length <= 2} className={isDarkMode ? 'text-white hover:bg-gray-600' : ''}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                        </div>
                        {isEditing && (
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                              <Label htmlFor={`${stage.id}-current-value`} className={`w-20 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Current Value:</Label>
                              <Input
                                id={`${stage.id}-current-value`}
                                type="number"
                                value={stage.currentValue}
                                onChange={(e) => handleValueChange(index, parseInt(e.target.value) || 0, true)}
                                className={`flex-grow h-8 ${isDarkMode ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'} focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50`}
                              />
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Label htmlFor={`${stage.id}-new-value`} className={`w-20 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>New Value:</Label>
                              <Input
                                id={`${stage.id}-new-value`}
                                type="number"
                                value={stage.newValue}
                                onChange={(e) => handleValueChange(index, parseInt(e.target.value) || 0, false)}
                                className={`flex-grow h-8 ${isDarkMode ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'} focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50`}
                              />
                            </div>
                            {index > 0 && (
                              <>
                                <div className="flex items-center gap-2 text-sm">
                                  <Label htmlFor={`${stage.id}-current-conversion`} className={`w-20 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Current Rate:</Label>
                                  <Input
                                    id={`${stage.id}-current-conversion`}
                                    type="number"
                                    value={stage.currentConversionRate}
                                    onChange={(e) => handleConversionRateChange(index, parseFloat(e.target.value) || 0, true)}
                                    className={`w-20 h-8 ${isDarkMode ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'} focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50`}
                                  />
                                  <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>%</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <Label htmlFor={`${stage.id}-new-conversion`} className={`w-20 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>New Rate:</Label>
                                  <Input
                                    id={`${stage.id}-new-conversion`}
                                    type="number"
                                    value={stage.newConversionRate}
                                    onChange={(e) => handleConversionRateChange(index, parseFloat(e.target.value) || 0, false)}
                                    className={`w-20 h-8 ${isDarkMode ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'} focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50`}
                                  />
                                  <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>%</span>
                                </div>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </React.Fragment>
                  ))}
                </CardContent>
              </Card>
            </div>
            <div className="space-y-6">
              <Card className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'} shadow-sm hover:shadow-md`}>
                <CardHeader className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <CardTitle className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                      Funnel Visualization
                    </CardTitle>
                    <Button 
                      onClick={() => setScaleType(scaleType === 'linear' ? 'logarithmic' : 'linear')} 
                      variant="outline" 
                      size="sm"
                      className={isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : ''}
                    >
                      {scaleType === 'linear' ? 'Zoom In' : 'Zoom Out'}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-4" ref={chartRef}>
                  <ResponsiveContainer width="100%" height={500}>
                    <FunnelChart>
                      <Tooltip content={<CustomTooltip />} />
                      <Funnel
                        dataKey="currentValueScaled"
                        data={transformedData}
                        isAnimationActive
                      >
                        {
                          transformedData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))
                        }
                      </Funnel>
                      <Funnel
                        dataKey="newValueScaled"
                        data={transformedData}
                        isAnimationActive
                      >
                        {
                          transformedData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} opacity={0.5} />
                          ))
                        }
                      </Funnel>
                      <LabelList position="right" content={<CustomizedLabel />} dataKey="improvement" />
                    </FunnelChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <Card className={`${isDarkMode ? 'bg-gradient-to-br from-blue-900 to-blue-800' : 'bg-gradient-to-br from-blue-500 to-blue-600'} text-white shadow-sm hover:shadow-md`}>
                <CardHeader>
                  <CardTitle className="text-xl font-semibold flex justify-between items-center">
                    <span>{isAnnual ? 'Annual' : 'Monthly'} Revenue Impact</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-normal">Monthly</span>
                      <Switch
                        checked={isAnnual}
                        onCheckedChange={setIsAnnual}
                      />
                      <span className="text-sm font-normal">Annual</span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg">Current Revenue:</span>
                      <span className="text-2xl font-bold">${currentRevenue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg">Projected Revenue:</span>
                      <span className="text-2xl font-bold">${newRevenue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg">Revenue Increase:</span>
                      <span className="text-2xl font-bold">${totalRevenueSaved.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg">Revenue Increase %:</span>
                      <span className="text-2xl font-bold">
                        {(totalRevenueSaved / currentRevenue * 100).toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}