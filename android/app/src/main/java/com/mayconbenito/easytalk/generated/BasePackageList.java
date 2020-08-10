package com.mayconbenito.easytalk.generated;

import java.util.Arrays;
import java.util.List;
import org.unimodules.core.interfaces.Package;

public class BasePackageList {
  public List<Package> getPackageList() {
    return Arrays.<Package>asList(
        new expo.modules.imagepicker.ImagePickerPackage(),
        new expo.modules.permissions.PermissionsPackage(),
        new expo.modules.updates.UpdatesPackage()
    );
  }
}
