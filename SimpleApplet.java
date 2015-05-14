import java.awt.*;
import java.awt.event.*;
import java.applet.* ;
import javax.swing.*;
import javax.swing.event.*;

public class SimpleApplet extends JApplet implements ActionListener
{
    JSlider days;
    JCheckBox trips;
    JRadioButton hotel;
    JRadioButton tent;
    JLabel result;
    JLabel daysLabel;

    public void init()
    {
        trips = new JCheckBox("Excursii cu barca(recomandat)");
        hotel = new JRadioButton("Hotel");
        tent = new JRadioButton("Cort");
        days = new JSlider(JSlider.HORIZONTAL, 1, 30, 5);
        daysLabel = new JLabel("Zile: " + 5);
        result = new JLabel("Cost total: ");

        tent.addItemListener(new ItemListener() {
            @Override
            public void itemStateChanged(ItemEvent e) {
                recalculate();
            }
        });
        hotel.addItemListener(new ItemListener() {
            @Override
            public void itemStateChanged(ItemEvent e) {
                recalculate();
            }
        });
        trips.addItemListener(new ItemListener() {
            @Override
            public void itemStateChanged(ItemEvent e) {
                recalculate();
            }
        });
        days.addChangeListener(new ChangeListener() {

            @Override
            public void stateChanged(ChangeEvent e) {
                recalculate();
            }
        });
        ButtonGroup gr = new ButtonGroup();
        gr.add(hotel);
        gr.add(tent);
        hotel.setSelected(true);
        tent.setSelected(false);

        getContentPane().setLayout(new BoxLayout(getContentPane(), BoxLayout.PAGE_AXIS));
        getContentPane().add(hotel);
        getContentPane().add(tent);
        getContentPane().add(trips);
        getContentPane().add(daysLabel);
        getContentPane().add(days);
        getContentPane().add(result);

        recalculate();
    }

    public void actionPerformed(ActionEvent e)
    {
        recalculate();
    }

    private void recalculate()
    {
        int cost = 0;
        int stayPrice = 0;
        if (hotel.isSelected()) stayPrice = Integer.parseInt(getParameter("hotel"));
        else if (tent.isSelected()) stayPrice = Integer.parseInt(getParameter("tent"));

        if (trips.isSelected()) stayPrice += Integer.parseInt(getParameter("trip"));
        daysLabel.setText("Zile: " + days.getValue());
        result.setText("Cost: " + (stayPrice * days.getValue()) + " ron");

    }

}
