import { Link, StyleSheet, Text, View } from '@react-pdf/renderer'
import { useContext } from 'react'
import { OrderContext } from 'src/features/order/context/OrderContext'
import { dayMonthYear } from 'src/shared/utils/timeago.utils'

const CLIENT_ENDPOINT = import.meta.env.VITE_CLIENT_ENDPOINT

const styles = StyleSheet.create({
  spaceBetween: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', color: '#3E3E3E' },
  titleContainer: { flexDirection: 'row', marginTop: 20 },
  title: { fontSize: 11, fontFamily: 'Lato Bold', fontWeight: 'bold' },
  subTitle: { fontSize: 10 },
  link: { fontSize: 10, color: '#4aa1f3' }
})

export default function InvoiceUserInfo() {
  const { orderInvoice } = useContext(OrderContext)

  return (
    <>
      {orderInvoice && Object.keys(orderInvoice).length > 0 && (
        <>
          <View style={styles.titleContainer}>
            <View style={styles.spaceBetween}>
              <View style={{ maxWidth: 200 }}>
                <Text style={styles.title}>To </Text>
                <Text style={styles.subTitle}>{orderInvoice.buyerUsername}</Text>
              </View>
              <View style={{ maxWidth: 200 }}>
                <Text style={styles.title}>Date issued</Text>
                <Text style={styles.subTitle}>{dayMonthYear(`${orderInvoice.date}`)}</Text>
              </View>
            </View>
          </View>
          <View style={styles.titleContainer}>
            <View style={styles.spaceBetween}>
              <View></View>
              <View style={{ maxWidth: 200 }}>
                <Text style={styles.title}>Order number</Text>
                <Link src={`${`${CLIENT_ENDPOINT}/orders/${orderInvoice.orderId}/activities`}`} style={styles.link}>
                  {orderInvoice.orderId}
                </Link>
              </View>
            </View>
          </View>
        </>
      )}
    </>
  )
}
