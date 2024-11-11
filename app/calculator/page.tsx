"use client"

import { useState, useMemo, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { FunnelChart, Funnel, LabelList, ResponsiveContainer, Cell, Tooltip } from 'recharts'
import { DollarSignIcon, PlusCircle, ChevronUp, ChevronDown, Pencil, Lock, Trash2, Moon, Sun } from 'lucide-react'
import { TooltipProvider } from "@/components/ui/tooltip"

type FunnelStage = {
  id: string
  name: string
  oldValue: number
  newValue: number
  oldConversionRate: number
  newConversionRate: number
}

type ScaleType = 'linear' | 'logarithmic'

export default function FunnelCalculator() {
  const [funnelData, setFunnelData] = useState<FunnelStage[]>([
    { id: '1', name: 'Monthly Views', oldValue: 100000, newValue: 100000, oldConversionRate: 100, newConversionRate: 100 },
    { id: '2', name: 'Profile Visits', oldValue: 2000, newValue: 2000, oldConversionRate: 2, newConversionRate: 2 },
    { id: '3', name: 'Link Clicks', oldValue: 400, newValue: 400, oldConversionRate: 20, newConversionRate: 20 },
    { id: '4', name: 'Applications Started', oldValue: 340, newValue: 340, oldConversionRate: 85, newConversionRate: 85 },
    { id: '5', name: 'Applications Completed', oldValue: 119, newValue: 204, oldConversionRate: 35, newConversionRate: 60 },
    { id: '6', name: 'Calls Booked', oldValue: 42, newValue: 122, oldConversionRate: 35, newConversionRate: 60 },
    { id: '7', name: 'Shows', oldValue: 29, newValue: 85, oldConversionRate: 70, newConversionRate: 70 },
    { id: '8', name: 'Closes', oldValue: 9, newValue: 26, oldConversionRate: 30, newConversionRate: 30 },
  ])
  const [oldPrice, setOldPrice] = useState(1000)
  const [newPrice, setNewPrice] = useState(1000)
  const [isEditing, setIsEditing] = useState(false)
  const [scaleType, setScaleType] = useState<ScaleType>('logarithmic')
  const [isAnnual, setIsAnnual] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const correctPassword = '2024';


  const handleAuthentication = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password. Please try again.');
    }
  };

  const calculatedData = useMemo(() => {
    let cumulativeOldValue = funnelData[0].oldValue;
    let cumulativeNewValue = funnelData[0].newValue;
    
    return funnelData.map((stage, index) => {
      let oldValue = stage.oldValue;
      let newValue = stage.newValue;
      let improvementPercentage = 0;
      let revenueSaved = 0;

      if (index > 0) {
        oldValue = Math.round(cumulativeOldValue * (stage.oldConversionRate / 100));
        newValue = Math.round(cumulativeNewValue * (stage.newConversionRate / 100));
        improvementPercentage = oldValue !== 0 ? ((newValue - oldValue) / oldValue * 100) : 0;
        
        const oldRevenue = oldValue * oldPrice;
        const newRevenue = newValue * newPrice;
        revenueSaved = newRevenue - oldRevenue;
      }

      cumulativeOldValue = oldValue;
      cumulativeNewValue = newValue;

      return {
        ...stage,
        oldValue,
        newValue,
        improvementPercentage,
        revenueSaved
      };
    });
  }, [funnelData, oldPrice, newPrice])

  const { oldRevenue, newRevenue, totalRevenueSaved } = useMemo(() => {
    const lastStage = calculatedData[calculatedData.length - 1];
    const monthlyOldRevenue = lastStage ? lastStage.oldValue * oldPrice : 0;
    const monthlyNewRevenue = lastStage ? lastStage.newValue * newPrice : 0;
    const monthlyTotalRevenueSaved = monthlyNewRevenue - monthlyOldRevenue;
    
    return {
      oldRevenue: isAnnual ? monthlyOldRevenue * 12 : monthlyOldRevenue,
      newRevenue: isAnnual ? monthlyNewRevenue * 12 : monthlyNewRevenue,
      totalRevenueSaved: isAnnual ? monthlyTotalRevenueSaved * 12 : monthlyTotalRevenueSaved,
    };
  }, [calculatedData, oldPrice, newPrice, isAnnual])

  const logScale = (value: number) => Math.log10(value + 1)

  const transformedData = useMemo(() => {
    const maxOldValue = Math.max(...calculatedData.map(d => d.oldValue))
    const maxNewValue = Math.max(...calculatedData.map(d => d.newValue))
    const maxLogValue = Math.max(logScale(maxOldValue), logScale(maxNewValue))

    return calculatedData.map(d => ({
      ...d,
      oldValueScaled: scaleType === 'logarithmic' ? logScale(d.oldValue) / maxLogValue : d.oldValue / maxOldValue,
      newValueScaled: scaleType === 'logarithmic' ? logScale(d.newValue) / maxLogValue : d.newValue / maxNewValue
    }))
  }, [calculatedData, scaleType])

  const handleNameChange = (index: number, newName: string) => {
    setFunnelData(prev => prev.map((stage, i) => 
      i === index ? { ...stage, name: newName } : stage
    ))
  }

  const handleValueChange = (index: number, newValue: number, isOld: boolean) => {
    setFunnelData(prev => {
      const updatedData = [...prev]
      updatedData[index] = { ...updatedData[index], [isOld ? 'oldValue' : 'newValue']: newValue }
      if (index > 0) {
        const previousStage = updatedData[index - 1]
        const newRate = (newValue / previousStage[isOld ? 'oldValue' : 'newValue']) * 100
        updatedData[index][isOld ? 'oldConversionRate' : 'newConversionRate'] = parseFloat(newRate.toFixed(2))
      }
      for (let i = index + 1; i < updatedData.length; i++) {
        const prevStage = updatedData[i - 1]
        const oldValue = Math.round(prevStage.oldValue * (updatedData[i].oldConversionRate / 100))
        const newValue = Math.round(prevStage.newValue * (updatedData[i].newConversionRate / 100))
        updatedData[i] = { ...updatedData[i], oldValue, newValue }
      }
      return updatedData
    })
  }

  const handleConversionRateChange = (index: number, newRate: number, isOld: boolean) => {
    setFunnelData(prev => {
      const updatedData = [...prev]
      updatedData[index] = { ...updatedData[index], [isOld ? 'oldConversionRate' : 'newConversionRate']: newRate }
      for (let i = index; i < updatedData.length; i++) {
        const prevStage = i > 0 ? updatedData[i - 1] : { oldValue: updatedData[0].oldValue, newValue: updatedData[0].newValue }
        const oldValue = Math.round(prevStage.oldValue * (updatedData[i].oldConversionRate / 100))
        const newValue = Math.round(prevStage.newValue * (updatedData[i].newConversionRate / 100))
        updatedData[i] = { ...updatedData[i], oldValue, newValue }
      }
      return updatedData
    })
  }

  const addStep = (index: number) => {
    const newId = (parseInt(funnelData[funnelData.length - 1].id) + 1).toString()
    const newStep = {
      id: newId,
      name: `New Step ${newId}`,
      oldValue: 0,
      newValue: 0,
      oldConversionRate: 100,
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
      const data = payload[0].payload;
      const hasRateImprovement = data.newConversionRate > data.oldConversionRate;
      const improvementPercentage = ((data.newConversionRate - data.oldConversionRate) / data.oldConversionRate) * 100;
      const stepRevenueSaved = (improvementPercentage / 100) * totalRevenueSaved;
      const percentageOfTotalSaved = (stepRevenueSaved / totalRevenueSaved) * 100;

      return (
        <div className={`p-4 rounded-lg shadow-lg border ${
          isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-800 border-gray-200'
        }`}>
          <p className="font-semibold">{data.name}</p>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Old Value: {data.oldValue.toLocaleString()}</p>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>New Value: {data.newValue.toLocaleString()}</p>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Old Rate: {data.oldConversionRate.toFixed(2)}%</p>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>New Rate: {data.newConversionRate.toFixed(2)}%</p>
          {hasRateImprovement && (
            <p className={`font-semibold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
              Projected Revenue Saved: ${stepRevenueSaved.toLocaleString()} ({percentageOfTotalSaved.toFixed(2)}% of total)
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  const CustomizedLabel = (props: any) => {
    const { x, y, width, height, value, name, fill } = props
    return (
      <g>
        <text 
          x={x + width / 2} 
          y={y + height / 2} 
          fill={fill} 
          textAnchor="middle" 
          dominantBaseline="central" 
          className="text-xs font-medium"
        >
          {name}
        </text>
        <text x={x + width / 2} y={y + height / 2 + 15} fill={fill} textAnchor="middle" dominantBaseline="central" className="text-xs">
          {value.toLocaleString()}
        </text>
      </g>
    )
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

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Enter Password</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAuthentication} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className={`min-h-screen bg-gradient-to-br ${isDarkMode ? 'from-gray-900 to-gray-800' : 'from-gray-50 to-gray-100'} p-4 md:p-8 transition-colors duration-200`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Funnel Optimizer</h1>
            <div className="flex gap-4">
              <Button onClick={() => setScaleType(scaleType === 'linear' ? 'logarithmic' : 'linear')} variant="outline" className={isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : ''}>
                {scaleType === 'linear' ? 'Switch to Logarithmic' : 'Switch to Linear'}
              </Button>
              <Button onClick={() => setIsEditing(!isEditing)} variant="outline" className={isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : ''}>
                {isEditing ? <><Lock className="w-4 h-4 mr-2" /> Lock Funnel</> : <><Pencil className="w-4 h-4 mr-2" /> Edit Funnel</>}
              </Button>
              <Button onClick={() => setIsDarkMode(!isDarkMode)} variant="outline" className={isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : ''}>
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-4">
              <Card className={`overflow-hidden ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'} shadow-sm hover:shadow-md transition-shadow duration-300`}>
                <CardHeader className={`py-2 flex flex-row items-center justify-between ${isEditing ? (isDarkMode ? 'bg-gray-700' : 'bg-gray-50') : ''}`}>
                  <div className="flex items-center">
                    <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Program Price</span>
                  </div>
                </CardHeader>
                {isEditing && (
                  <CardContent className="p-3 space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Label htmlFor="oldPrice" className={`w-20 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Old Price:</Label>
                      <Input
                        id="oldPrice"
                        type="number"
                        value={oldPrice}
                        onChange={(e) => setOldPrice(Math.max(0, Number(e.target.value)))}
                        className={`flex-grow h-8 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50`}
                      />
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Label htmlFor="newPrice" className={`w-20 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>New Price:</Label>
                      <Input
                        id="newPrice"
                        type="number"
                        value={newPrice}
                        onChange={(e) => setNewPrice(Math.max(0, Number(e.target.value)))}
                        className={`flex-grow h-8 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50`}
                      />
                    </div>
                  </CardContent>
                )}
              </Card>
              {funnelData.map((stage, index) => (
                <div key={stage.id}>
                  {isEditing && index > 0 && (
                    <div className="flex justify-center my-2">
                      <Button variant="ghost" size="sm" onClick={() => addStep(index - 1)} className={isDarkMode ? 'text-white hover:bg-gray-700' : ''}>
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  <Card className={`overflow-hidden ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'} shadow-sm hover:shadow-md transition-shadow duration-300`}>
                    <CardHeader className={`py-2 flex flex-row items-center justify-between ${isEditing ? (isDarkMode ? 'bg-gray-700' : 'bg-gray-50') : ''}`}>
                      <div className="flex items-center">
                        {isEditing ? (
                          <Input
                            value={stage.name}
                            onChange={(e) => handleNameChange(index, e.target.value)}
                            className={`font-semibold ${isDarkMode ? 'text-white bg-gray-700' : 'text-gray-800 bg-transparent'} border-none focus:ring-0`}
                          />
                        ) : (
                          <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{stage.name}</span>
                        )}
                      </div>
                      {isEditing && (
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => moveStep(index, 'up')} disabled={index === 0} className={isDarkMode ? 'text-white hover:bg-gray-700' : ''}>
                            <ChevronUp className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => moveStep(index, 'down')} disabled={index === funnelData.length - 1} className={isDarkMode ? 'text-white hover:bg-gray-700' : ''}>
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => deleteStep(index)} disabled={funnelData.length <= 2} className={isDarkMode ? 'text-white hover:bg-gray-700' : ''}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </CardHeader>
                    {isEditing && (
                      <CardContent className="p-3 space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Label htmlFor={`${stage.id}-old-value`} className={`w-20 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Old Value:</Label>
                          <Input
                            id={`${stage.id}-old-value`}
                            type="number"
                            value={stage.oldValue}
                            onChange={(e) => handleValueChange(index, parseInt(e.target.value) || 0, true)}
                            className={`flex-grow h-8 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50`}
                          />
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Label htmlFor={`${stage.id}-new-value`} className={`w-20 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>New Value:</Label>
                          <Input
                            id={`${stage.id}-new-value`}
                            type="number"
                            value={stage.newValue}
                            onChange={(e) => handleValueChange(index, parseInt(e.target.value) || 0, false)}
                            className={`flex-grow h-8 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50`}
                          />
                        </div>
                        {index > 0 && (
                          <>
                            <div className="flex items-center gap-2 text-sm">
                              <Label htmlFor={`${stage.id}-old-conversion`} className={`w-20 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Old Rate:</Label>
                              <Input
                                id={`${stage.id}-old-conversion`}
                                type="number"
                                value={stage.oldConversionRate}
                                onChange={(e) => handleConversionRateChange(index, parseFloat(e.target.value) || 0, true)}
                                className={`w-20 h-8 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50`}
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
                                className={`w-20 h-8 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50`}
                              />
                              <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>%</span>
                            </div>
                          </>
                        )}
                      </CardContent>
                    )}
                  </Card>
                </div>
              ))}
              {isEditing && (
                <div className="flex justify-center mt-2">
                  <Button variant="ghost" size="sm" onClick={() => addStep(funnelData.length - 1)} className={isDarkMode ? 'text-white hover:bg-gray-700' : ''}>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Step
                  </Button>
                </div>
              )}
            </div>
            <div className="lg:col-span-2 space-y-6">
              <Card className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'} shadow-sm hover:shadow-md transition-shadow duration-300`}>
                <CardHeader>
                  <CardTitle className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    Funnel Visualization ({scaleType === 'linear' ? 'Linear' : 'Logarithmic'} Scale)
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4" ref={chartRef}>
                  <ResponsiveContainer width="100%" height={500}>
                    <FunnelChart>
                      <Tooltip content={<CustomTooltip />} />
                      <Funnel
                        dataKey="oldValueScaled"
                        data={transformedData}
                        isAnimationActive
                      >
                        {
                          transformedData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))
                        }
                        <LabelList position="center" content={<CustomizedLabel />} dataKey="oldValue" />
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
                        <LabelList position="center" content={<CustomizedLabel />} dataKey="newValue" />
                      </Funnel>
                    </FunnelChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <Card className={`${isDarkMode ? 'bg-gradient-to-br from-blue-900 to-blue-800' : 'bg-gradient-to-br from-blue-500 to-blue-600'} text-white shadow-sm hover:shadow-md transition-shadow duration-300`}>
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
                      <span className="text-2xl font-bold">${oldRevenue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg">Projected Revenue:</span>
                      <span className="text-2xl font-bold">${newRevenue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg">Revenue Increase:</span>
                      <span className="text-2xl font-bold">${(newRevenue - oldRevenue).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg">Revenue Increase %:</span>
                      <span className="text-2xl font-bold">
                        {((newRevenue - oldRevenue) / oldRevenue * 100).toFixed(2)}%
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