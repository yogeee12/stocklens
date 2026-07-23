import re

def clean_price(value):
    if not value:
        return None

    value = value.replace("₹", "").replace(",", "").strip()

    try:
        return float(value)
    except ValueError:
        return None


def clean_percent(value):
    if not value:
        return None

    value = value.replace("%", "").replace("(","").replace(")","").strip()

    try:
        return float(value)
    except ValueError:
        return None