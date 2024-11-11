"use client"

import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, LabelList } from 'recharts'
import { DollarSignIcon, PlusCircle, Trash2, ChevronDown, GripVertical } from 'lucide-react'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'

type FunnelStage = {
  id: string
  name: string
  oldValue: number
  newValue: number
  oldConversionRate: number
  newConversionRate: number
}

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

  const calculatedData = useMemo(() => {
    return funnelData.map((stage, index) => {
      let oldValue = stage.oldValue;
      let newValue = stage.newValue;
      let improvementPercentage = 0;
      let oldDropOffPercentage = 0;
      let newDropOffPercentage = 0;
      let oldRevenueLoss = 0;
      let newRevenueLoss = 0;

      if (index > 0) {
        const previousStage = funnelData[index - 1];
        oldValue = Math.round(previousStage.oldValue * (stage.oldConversionRate / 100));
        newValue = Math.round(previousStage.newValue * (stage.newConversionRate / 100));
        improvementPercentage = oldValue !== 0 ? ((newValue - oldValue) / oldValue * 100) : 0;
        oldDropOffPercentage = previousStage.oldValue !== 0
          ? ((previousStage.oldValue - oldValue) / previousStage.oldValue * 100)
          : 0;
        newDropOffPercentage = previousStage.newValue !== 0
          ? ((previousStage.newValue - newValue) / previousStage.newValue * 100)
          : 0;
        oldRevenueLoss = (previousStage.oldValue - oldValue) * oldPrice;
        newRevenueLoss = (previousStage.newValue - newValue) * newPrice;
      }

      return {
        ...stage,
        oldValue,
        newValue,
        improvementPercentage,
        oldDropOffPercentage,
        newDropOffPercentage,
        oldRevenueLoss,
        newRevenueLoss
      };
    });
  }, [funnelData, oldPrice, newPrice])

  const { oldRevenue, newRevenue } = useMemo(() => {
    const lastStage = calculatedData[calculatedData.length - 1]
    return {
      oldRevenue: lastStage.oldValue * oldPrice,
      newRevenue: lastStage.newValue * newPrice
    }
  }, [calculatedData, oldPrice, newPrice])

  const handleNameChange = (index: number, newName: string) => {
    setFunnelData(prev => prev.map((stage, i) => 
      i === index ? { ...stage, name: newName } : stage
    ));
  };

  const handleValueChange = (index: number, newValue: number, isOld: boolean) => {
    setFunnelData(prev => {
      const updatedData = [...prev];
      updatedData[index] = { ...updatedData[index], [isOld ? 'oldValue' : 'newValue']: newValue };
      if (index > 0) {
        const previousStage = updatedData[index - 1];
        const newRate = (newValue / previousStage[isOld ? 'oldValue' : 'newValue']) * 100;
        updatedData[index][isOld ? 'oldConversionRate' : 'newConversionRate'] = parseFloat(newRate.toFixed(2));
      }
      // Recalculate all subsequent stages
      for (let i = index + 1; i < updatedData.length; i++) {
        const prevStage = updatedData[i - 1];
        const oldValue = Math.round(prevStage.oldValue * (updatedData[i].oldConversionRate / 100));
        const newValue = Math.round(prevStage.newValue * (updatedData[i].newConversionRate / 100));
        updatedData[i] = { ...updatedData[i], oldValue, newValue };
      }
      return updatedData;
    });
  };

  const handleConversionRateChange = (index: number, newRate: number, isOld: boolean) => {
    setFunnelData(prev => {
      const updatedData = [...prev];
      updatedData[index] = { ...updatedData[index], [isOld ? 'oldConversionRate' : 'newConversionRate']: newRate };
      // Recalculate this stage's value and all subsequent stages
      for (let i = index; i < updatedData.length; i++) {
        const prevStage = i > 0 ? updatedData[i - 1] : { oldValue: updatedData[0].oldValue, newValue: updatedData[0].newValue };
        const oldValue = Math.round(prevStage.oldValue * (updatedData[i].oldConversionRate / 100));
        const newValue = Math.round(prevStage.newValue * (updatedData[i].newConversionRate / 100));
        updatedData[i] = { ...updatedData[i], oldValue, newValue };
      }
      return updatedData;
    });
  };

  const addStep = () => {
    const newId = (parseInt(funnelData[funnelData.length - 1].id) + 1).toString();
    setFunnelData(prev => [...prev, {
      id: newId,
      name: `New Step ${newId}`,
      oldValue: 0,
      newValue: 0,
      oldConversionRate: 100,
      newConversionRate: 100
    }]);
  };

  const deleteStep = (index: number) => {
    if (funnelData.length > 2) {
      setFunnelData(prev => prev.filter((_, i) => i !== index));
    }
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const newFunnelData = Array.from(funnelData);
    const [reorderedItem] = newFunnelData.splice(result.source.index, 1);
    newFunnelData.splice(result.destination.index, 0, reorderedItem);

    // Recalculate values for all items after the move
    const updatedFunnelData = newFunnelData.map((item, index) => {
      if (index === 0) return item;
      const prevItem = newFunnelData[index - 1];
      const oldValue = Math.round(prevItem.oldValue * (item.oldConversionRate / 100));
      const newValue = Math.round(prevItem.newValue * (item.newConversionRate / 100));
      return { ...item, oldValue, newValue };
    });

    setFunnelData(updatedFunnelData);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const { oldValue, newValue, improvementPercentage, oldDropOffPercentage, newDropOffPercentage, oldRevenueLoss, newRevenueLoss } = payload[0].payload
      const improvement = newValue - oldValue
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800">{label}</p>
          <p className="text-gray-600">Old Value: {oldValue.toLocaleString()}</p>
          <p className="text-gray-600">New Value: {newValue.toLocaleString()}</p>
          <p className="text-green-600 font-semibold">Improvement: {improvement.toLocaleString()} ({improvementPercentage.toFixed(2)}%)</p>
          <p className="text-red-600">Old Drop-off: {oldDropOffPercentage.toFixed(2)}%</p>
          <p className="text-red-600">New Drop-off: {newDropOffPercentage.toFixed(2)}%</p>
          <p className="text-orange-600">Old Revenue Loss: ${oldRevenueLoss.toLocaleString()}</p>
          <p className="text-orange-600">New Revenue Loss: ${newRevenueLoss.toLocaleString()}</p>
        </div>
      )
    }
    return null
  }

  const CustomizedLabel = (props: any) => {
    const { x, y, width, value } = props
    const formattedValue = typeof value === 'number' && !isNaN(value) ? `${value.toFixed(2)}%` : '';
    const color = typeof value === 'number' && value >= 0 ? '#10b981' : '#ef4444';  // Green for positive, red for negative
    return (
      <text x={x + width / 2} y={y} fill={color} textAnchor="middle" dy={-6}>
        {formattedValue}
      </text>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Funnel Optimizer</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4">
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-3 space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Label htmlFor="oldPrice" className="w-32 text-gray-600">Old Program Price:</Label>
                  <div className="flex-grow flex items-center">
                    <DollarSignIcon className="w-4 h-4 text-gray-400 mr-1" />
                    <Input
                      id="oldPrice"
                      type="number"
                      value={oldPrice}
                      onChange={(e) => setOldPrice(Math.max(0, Number(e.target.value)))}
                      className="flex-grow h-8 bg-gray-50 border-gray-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Label htmlFor="newPrice" className="w-32 text-gray-600">New Program Price:</Label>
                  <div className="flex-grow flex items-center">
                    <DollarSignIcon className="w-4 h-4 text-gray-400 mr-1" />
                    <Input
                      id="newPrice"
                      type="number"
                      value={newPrice}
                      onChange={(e) => setNewPrice(Math.max(0, Number(e.target.value)))}
                      className="flex-grow h-8 bg-gray-50 border-gray-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="funnel-stages" key="funnel-stages">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {funnelData.map((stage, index) => (
                      <Draggable key={stage.id} draggableId={stage.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`mb-4 ${snapshot.isDragging ? 'opacity-50' : ''}`}
                          >
                            <Card className="overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                              <CardHeader className="bg-gray-50 py-2 flex flex-row items-center justify-between">
                                <div className="flex items-center">
                                  <div {...provided.dragHandleProps} className="mr-2 cursor-move">
                                    <GripVertical className="h-4 w-4 text-gray-400" />
                                  </div>
                                  <Input
                                    value={stage.name}
                                    onChange={(e) => handleNameChange(index, e.target.value)}
                                    className="font-semibold text-gray-800 bg-transparent border-none focus:ring-0"
                                  />
                                </div>
                                {index > 1 && (
                                  <Button variant="ghost" size="sm" onClick={() => deleteStep(index)}>
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                )}
                              </CardHeader>
                              <CardContent className="p-3 space-y-2">
                                <div className="flex items-center gap-2 text-sm">
                                  <Label htmlFor={`${stage.id}-old-value`} className="w-20 text-gray-600">Old Value:</Label>
                                  <Input
                                    id={`${stage.id}-old-value`}
                                    type="number"
                                    value={stage.oldValue}
                                    onChange={(e) => handleValueChange(index, parseInt(e.target.value) || 0, true)}
                                    className="flex-grow h-8 bg-gray-50 border-gray-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                  />
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <Label htmlFor={`${stage.id}-new-value`} className="w-20 text-gray-600">New Value:</Label>
                                  <Input
                                    id={`${stage.id}-new-value`}
                                    type="number"
                                    value={stage.newValue}
                                    onChange={(e) => handleValueChange(index, parseInt(e.target.value) || 0, false)}
                                    className="flex-grow h-8 bg-gray-50 border-gray-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                  />
                                </div>
                                {index > 0 && (
                                  <>
                                    <div className="flex items-center gap-2 text-sm">
                                      <Label htmlFor={`${stage.id}-old-conversion`} className="w-20 text-gray-600">Old Rate:</Label>
                                      <Input
                                        id={`${stage.id}-old-conversion`}
                                        type="number"
                                        value={stage.oldConversionRate}
                                        onChange={(e) => handleConversionRateChange(index, parseFloat(e.target.value) || 0, true)}
                                        className="w-20 h-8 bg-gray-50 border-gray-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                      />
                                      <span className="text-xs text-gray-500">%</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                      <Label htmlFor={`${stage.id}-new-conversion`} className="w-20 text-gray-600">New Rate:</Label>
                                      <Input
                                        id={`${stage.id}-new-conversion`}
                                        type="number"
                                        value={stage.newConversionRate}
                                        onChange={(e) => handleConversionRateChange(index, parseFloat(e.target.value) || 0, false)}
                                        className="w-20 h-8 bg-gray-50 border-gray-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                      />
                                      <span className="text-xs text-gray-500">%</span>
                                    </div>
                                  </>
                                )}
                              </CardContent>
                              {index < funnelData.length - 1 && (
                                <div className="flex justify-center py-2">
                                  <ChevronDown className="h-6 w-6 text-gray-400" />
                                </div>
                              )}
                            </Card>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            <Button onClick={addStep} className="w-full">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Step
            </Button>
          </div>
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">Funnel Visualization</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <ResponsiveContainer width="100%" height={500}>
                  <BarChart
                    data={calculatedData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="name" 
                      angle={-45} 
                      textAnchor="end" 
                      height={70} 
                      interval={0}
                      tick={{fontSize: 12}}
                    />
                    <YAxis scale="log" domain={['auto', 'auto']} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="oldValue" fill="#3b82f6" name="Old Value">
                      <LabelList dataKey="improvementPercentage" content={<CustomizedLabel />} />
                    </Bar>
                    <Bar dataKey="newValue" fill="#10b981" name="New Value" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Monthly Revenue Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg">Current Monthly Revenue:</span>
                    <span className="text-2xl font-bold">${oldRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg">Projected Monthly Revenue:</span>
                    <span className="text-2xl font-bold">${newRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg">Monthly Revenue Increase:</span>
                    <span className="text-2xl font-bold">${(newRevenue - oldRevenue).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg">Monthly Revenue Increase %:</span>
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
  )
}