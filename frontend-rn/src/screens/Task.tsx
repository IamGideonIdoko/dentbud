import React, { useState } from 'react';
import { ScrollView, Text, StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import type { AccordionRenderFC, AccordionSection } from '../interfaces/helper.interface';
import Accordion from 'react-native-collapsible/Accordion';
import type { FC } from 'react';
import PlusIcon from '../assets/icons/Plus.svg';
import EditIcon from '../assets/icons/Edit.svg';
import NotificationIcon from '../assets/icons/Notification.svg';
import NotificationActiveIcon from '../assets/icons/NotificationActive.svg';
import TrashIcon from '../assets/icons/Trash.svg';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const taskSectionTitle: AccordionRenderFC = (_, __, index) => {
  if (index !== 0) return <></>;
  return (
    <View style={styles.sectionTitle}>
      <Text>Here are all your tasks:</Text>
      <TouchableWithoutFeedback onPress={() => console.log('add courses')}>
        <PlusIcon width={25} height={25} />
      </TouchableWithoutFeedback>
    </View>
  );
};

const taskHeader: AccordionRenderFC = (_, section, __, isActive) => {
  return (
    <View style={[styles.header, { backgroundColor: isActive ? '#4845d2' : '#dadaf6' }]}>
      <Text style={[styles.headerText, { color: isActive ? 'white' : '#070715' }]}>{section.title}</Text>
      <View style={styles.headerActions}>
        <TouchableWithoutFeedback onPress={() => console.log('trigger notification')}>
          {true ? (
            <NotificationIcon style={styles.headerActionBtn} width={20} height={20} />
          ) : (
            <NotificationActiveIcon style={styles.headerActionBtn} width={20} height={20} />
          )}
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => console.log('trigger edit')}>
          <EditIcon style={styles.headerActionBtn} width={20} height={20} />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => console.log('trigger delete')}>
          <TrashIcon style={styles.headerActionBtn} width={20} height={20} />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const taskContent: AccordionRenderFC = (_, section) => {
  return (
    <View style={styles.content}>
      {/* <Text>{section.content}</Text> */}
      <View style={styles.listItem}>
        <View style={styles.listItemChild1}>
          <Text>Title</Text>
          <Text>: </Text>
        </View>
        <Text style={styles.listItemChild2}>
          <Text>Operating System</Text>
        </Text>
      </View>
      <View style={styles.listItem}>
        <View style={styles.listItemChild1}>
          <Text>Description</Text>
          <Text>: </Text>
        </View>
        <Text style={styles.listItemChild2}>
          <Text>Lorem, ipsum dolor sit amet consectetur adipisicing!</Text>
        </Text>
      </View>
      <View style={styles.listItem}>
        <View style={styles.listItemChild1}>
          <Text>Starts</Text>
          <Text>: </Text>
        </View>
        <Text style={styles.listItemChild2}>
          <Text>10-10-2022 by 11:30am</Text>
        </Text>
      </View>
      <View style={styles.listItem}>
        <View style={styles.listItemChild1}>
          <Text>Stops</Text>
          <Text>: </Text>
        </View>
        <Text style={styles.listItemChild2}>
          <Text>10-10-2022 by 11:30am</Text>
        </Text>
      </View>
    </View>
  );
};

const Task: FC = () => {
  const [activeSections, setActiveSections] = useState<number[]>([]);
  const [sections] = useState<AccordionSection[]>([
    {
      title: 'First',
      content: 'First Lorem ipsum...',
    },
    {
      title: 'Second',
      content: 'Second Lorem ipsum...',
    },
    {
      title: 'Third',
      content: 'Third Lorem ipsum...',
    },
  ]);

  const handleAccordionChange = (newActiveSections: number[]) => {
    setActiveSections(newActiveSections);
  };
  return (
    <ScrollView style={styles.scrollView}>
      <Accordion
        sections={sections}
        activeSections={activeSections}
        renderSectionTitle={(...args) => taskSectionTitle({}, ...args)}
        renderHeader={(...args) => taskHeader({}, ...args)}
        renderContent={(...args) => taskContent({}, ...args)}
        onChange={handleAccordionChange}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#dadaf6',
    padding: 15,
    margin: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    textAlign: 'left',
    fontSize: 16,
    fontWeight: '500',
    margin: 0,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    margin: 0,
    backgroundColor: '#edecfb',
  },
  scrollView: {
    // marginBottom: 60,
  },
  sectionTitle: {
    padding: 15,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 15,
  },
  listItemChild1: {
    width: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listItemChild2: {
    paddingLeft: 15,
    width: wp('100%') - 135,
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  headerActionBtn: {
    marginLeft: 15,
    borderWidth: 2,
  },
});

export default Task;