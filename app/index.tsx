import { useCallback, useState, useEffect } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Skottie } from 'react-native-skottie';

const now = new Date(); // Current date
const currentWeekStartDate = new Date(now.setDate(now.getDate() - now.getDay() + 1)); // Monday
const currentWeekEndDate = new Date(now.setDate(now.getDate() - now.getDay() + 7)); // Sunday
const screenWidth = Dimensions.get('window').width;
const dayIndexToDay = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const NUMBER_OF_LOTTIES_TO_RENDER = 1; // no crash
// const NUMBER_OF_LOTTIES_TO_RENDER = 7; // crash

const CalendarViewCustom = () => {
  const renderDaySquare = useCallback((dayIndex: number) => {
    const shouldLottieRender = false; // turn this to true to see the animation

    return (
      <View className="flex-col items-center" key={dayIndex}>
        <Text className="text-gray-800">{dayIndexToDay[dayIndex]}</Text>
        <View
          key={dayIndex}
          className={`${shouldLottieRender ? 'bg-blue-500' : 'bg-gray-200'} m-1 rounded-md`}
          style={{
            width: (screenWidth - 84) / 7,
            height: (screenWidth - 96) / 7,
          }}>
          {shouldLottieRender ? (
            <Skottie
              source={require('../assets/flame.json')}
              autoPlay
              loop
              speed={3}
              style={{
                width: (screenWidth - 96) / 7,
                height: (screenWidth - 96) / 7,
              }}
            />
          ) : null}
        </View>
      </View>
    );
  }, []);

  return (
    <View className="justify-between gap-y-1">
      <Text className="text-xl">
        {currentWeekStartDate.toLocaleString('default', { month: 'short' })}{' '}
        {currentWeekStartDate.getDate()}-{currentWeekEndDate.getDate()}
      </Text>

      <View className="flex-row">
        {Array.from({ length: NUMBER_OF_LOTTIES_TO_RENDER }).map((_, index) =>
          renderDaySquare(index)
        )}
      </View>
    </View>
  );
};

export default CalendarViewCustom;
